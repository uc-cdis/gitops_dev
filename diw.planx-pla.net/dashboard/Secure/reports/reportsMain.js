import './reportsTable.js';
import { amap, fetchRecentData } from './dataHelper.js';

export function main() {
    const dt =  new Date()
    const dataPath = `./${dt.getUTCFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`

    const fs = require("fs");
    const runningWorkspace = fs.readFileSync(dataPath + '/runningjupyter').toString('utf-8');
    console.log(runningWorkspace)

    const workspaceMetrics = require(dataPath + '/metrics.json');
    const startTime = require(dataPath + '/metrics.json');
    console.log(workspaceMetrics)
    console.log(startTime)


    const tableDiv = document.createElement("table");
    let trElement = document.createElement("tr");

    const prDiv = document.getElementById("cpu-reports");
    const tableHeader = [ "Pod","CPU quota","Pod Status"]

    for (let i = 0; i < tableHeader.length; i++) {
        console.log(tableHeader[i]);
        const thElement =  document.createElement("th");
        thElement.innerHTML = tableHeader[i]
        trElement.appendChild( thElement );
    }
    tableDiv.appendChild( trElement );


    for (const eachReport in reportJSON ) {
        console.log(reportJSON[eachReport])
        let tdElement = document.createElement('td');
        trElement = document.createElement("tr");
        tdElement.innerHTML = reportJSON[eachReport].metadata.name ;
        trElement.appendChild( tdElement );

        tdElement = document.createElement('td');
        tdElement.innerHTML = reportJSON[eachReport].metadata.creationTimestamp;
        trElement.appendChild( tdElement );

        let fuseCPU, fuseMem, hatcheryCPU, hatcheryMem
        if (reportJSON[eachReport].containers[0].name === "fuse-container") {
            fuseCPU = reportJSON[eachReport].containers[0].usage.cpu
            fuseMem = reportJSON[eachReport].containers[0].usage.memory
            hatcheryCPU = reportJSON[eachReport].containers[1].usage.cpu
            hatcheryMem = reportJSON[eachReport].containers[1].usage.memory

        } else {
            fuseCPU = reportJSON[eachReport].containers[1].usage.cpu
            fuseMem = reportJSON[eachReport].containers[1].usage.memory
            hatcheryCPU = reportJSON[eachReport].containers[0].usage.cpu
            const hatcheryMem = reportJSON[eachReport].containers[0].usage.memory
        }
        console.log(fuseCPU, fuseMem, hatcheryCPU, hatcheryMem)
        tdElement = document.createElement('td');
        tdElement.innerHTML = fuseCPU
        trElement.appendChild( tdElement );

        tdElement = document.createElement('td');
        tdElement.innerHTML = fuseMem
        trElement.appendChild( tdElement );

        tdElement = document.createElement('td');
        tdElement.innerHTML = hatcheryMem
        trElement.appendChild( tdElement );

        tdElement = document.createElement('td');
        tdElement.innerHTML = hatcheryMem
        trElement.appendChild( tdElement );
        tableDiv.appendChild( trElement );

    }
    prDiv.appendChild(tableDiv);
}



main();