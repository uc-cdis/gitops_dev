import './reportsTable.js';
import { amap, fetchRecentData } from './dataHelper.js';

export function main() {
    const reportJSON = [
        {
            "metadata": {
                "name": "hatchery-diw-40uchicago-2eedu",
                "namespace": "jupyter-pods-qa-covid19",
                "selfLink": "/apis/metrics.k8s.io/v1beta1/namespaces/jupyter-pods-qa-covid19/pods/hatchery-diw-40uchicago-2eedu",
                "creationTimestamp": "2020-10-14T10:41:16Z"
            },
            "timestamp": "2020-10-14T10:40:46Z",
            "window": "30s",
            "containers": [
                {
                    "name": "hatchery-container",
                    "usage": {
                        "cpu": "206629n",
                        "memory": "6592Ki"
                    }
                },
                {
                    "name": "fuse-container",
                    "usage": {
                        "cpu": "23761114n",
                        "memory": "19556Ki"
                    }
                }
            ]
        },
        {
            "metadata": {
                "name": "hatchery-planxdemo-40gmail-2ecom",
                "namespace": "jupyter-pods-qa-covid19",
                "selfLink": "/apis/metrics.k8s.io/v1beta1/namespaces/jupyter-pods-qa-covid19/pods/hatchery-planxdemo-40gmail-2ecom",
                "creationTimestamp": "2020-10-14T10:41:16Z"
            },
            "timestamp": "2020-10-14T10:40:37Z",
            "window": "30s",
            "containers": [
                {
                    "name": "fuse-container",
                    "usage": {
                        "cpu": "23450570n",
                        "memory": "5764Ki"
                    }
                },
                {
                    "name": "hatchery-container",
                    "usage": {
                        "cpu": "206874n",
                        "memory": "9448Ki"
                    }
                }
            ]
        }
    ];

    const tableDiv = document.createElement("table");
    let trElement = document.createElement("tr");

    const prDiv = document.getElementById("workspace-reports");
    const tableHeader = [ "Name","Creation Time","fuse-container CPU","fuse-container Memory","hatchery-container Cpu","hatchery-container Memory"]

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