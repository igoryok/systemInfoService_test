var cpu = require('windows-cpu');
var os = require('os');
var orm = require('orm');

var i=0;
module.exports = function () {
    return {
        saveSystemInfoPG: function () {
            cpu.totalLoad(function (error1, cpuResult) {
                cpu.totalMemoryUsage(function (error2, memoryResult) {

                    var totalMemory = os.totalmem();
                    var freeMemPercent = os.freemem()*100/totalMemory;
                    var usedMemPercent = 100 - freeMemPercent;
                    console.log(cpuResult[0],usedMemPercent)
                        new orm.SystemInfo({
                            cpu: cpuResult[0],
                            memory: usedMemPercent,
                            createdat: new Date()
                        }).save(function (error, result) {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                                //console.info(result)
                            })

                })
            })
        }
    }
}();

