var later = require('later');
var cpu = require('windows-cpu');
var SystemInfo = require('./models/SystemInfo');
//var task = require('./tasks/SystemInfo')();
//console.log(task.getSystemInfo());
var schedule = later.parse.recur().every(3).second(),
    t = later.setInterval(sysInf, schedule);

function sysInf(){

    cpu.totalLoad(function (error1, cpuResult) {
        cpu.totalMemoryUsage(function (error2, memoryResult) {
            console.log(error1,error2,cpuResult, memoryResult);
            new SystemInfo({
                cpu: cpuResult[0],
                memory: memoryResult.usageInKb
            }).save(function (error, result) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(result)
                })
        })
    })
}