var orm = require("orm");
var pg = require("pg");
var moment = require("moment");
var connectionString = "pg://postgres:postgres@localhost/node_system_info";

function getStatistic(callback) {
    var queryCleanOldData = 'DELETE FROM public.memcpu WHERE createdat < NOW() - INTERVAL \'1 day\';';
    var queryAgregatedStatistic = 'SELECT interval, max_cpu, min_cpu, avg_cpu, max_memory, min_memory, avg_memory ' +
    ' FROM  ( ' +
        ' SELECT date_trunc(\'hour\', "createdat") AS interval, ' +
                 ' MAX(cpu) as max_cpu, ' +
                 ' MIN(cpu) as min_cpu, ' +
                 ' ROUND(AVG(cpu), 2) as avg_cpu, ' +
                 ' MAX(memory) as max_memory, ' +
                 ' MIN(memory) as min_memory, ' +
                 ' ROUND(AVG(memory), 2) as avg_memory ' +
        ' FROM   public.memcpu ' +
        ' GROUP  BY 1 ' +
    ' ) sub ' +
    ' GROUP  BY interval, max_cpu, min_cpu, avg_cpu, max_memory, min_memory, avg_memory ' +
    ' ORDER  BY 1;';
    pg.connect(connectionString, function (err, client, done) {
        client.query(queryCleanOldData, function (err, rows) {

            if (err) throw err;
            done();
        });

        client.query(queryAgregatedStatistic, function (err, rows) {

            if (err) throw err;
            var result = [];
            var data = rows.rows;
            var dataLength = data.length;
            for(var i=0; i<dataLength;i++){
                var obj = {};
                var startMoment = moment(data[i].interval);
                var endMoment = moment(data[i].interval);
                endMoment = endMoment.add(59, 'minutes');
                endMoment = endMoment.add(59, 'seconds');
                obj.interval=[startMoment.toDate(), endMoment.toDate()];
                obj.cpu = {};
                obj.cpu.min = data[i].min_cpu;
                obj.cpu.max = data[i].max_cpu;
                obj.cpu.avg = data[i].avg_cpu;
                obj.memory = {};
                obj.memory.min = data[i].min_memory;
                obj.memory.max = data[i].max_memory;
                obj.memory.avg = data[i].avg_memory;
                result.push(obj)
            }
            callback(err, result);
            done();
        });
    });
}
orm.getAggregatedInfo = getStatistic;

orm.connect(connectionString, function(err, db){
    console.log(err);
    orm.SystemInfo = db.define('memcpu',{
        cpu:{type:"integer"},
        memory:{type:"integer"},
        createdat: {type:"date",time:true}
    });

});