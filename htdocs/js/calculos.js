"use strict";

function getHour() {
    var d = new Date();
    return d.getHours();
}

function getDevice(device, devices) {
    var count;
    for (count = 0; count < devices.length; count++) {
        if (devices[count].name === device) {
            return devices[count];
        }
    }
}

function totalConsumption(devices) {
    var sum, count;
    sum = 0;
    for (count = 0; count < devices.length; count++) {
        if (devices[count].metadatas[0].value === "true") {
            sum = sum + parseFloat(devices[count].value);
        }
    }
    return sum;
}

function deviceConsumption(device, devices) {
    var d = getDevice(device, devices);
    if (d.metadatas[0].value === "true") {
        return parseFloat(d.value);
    }
    return 0;
}

function nowCost(costs) {
    var h, count;
    h = getHour();
    for (count = 0; count < costs.length; count++) {
        if (costs[count].hour === h) {
            return costs[count]
        }
    }
}

function deviceCost(device, devices, costs) {
    return deviceConsumption(device, devices) * nowCost(costs).pvpc;
}

function deviceStatus(device, devices) {
    var d = getDevice(device, devices);
    return d.metadatas[0].value;
}

function fringeBestCost(fringeInf, fringeSup, costs) {
    var best, count, inf, sup;
    inf = parseInt(fringeInf);
    sup = parseInt(fringeSup);
    best = null;
    for (count = inf; count <= sup; count++) {
        if (best === null || costs[count].pvpc < best) {
            best = costs[count];
        }
    }
    return best;
}

function getCost(hour, costs) {
    var count;
    for (count = 0; count < costs.length; count++) {
        if (costs[count].hour === hour) {
            return costs[count];
        }
    }
}

function totalCost(devices, cost) {
    return (totalConsumption(devices) * parseFloat(nowCost(cost).pvpc)).toFixed(4);
}

function bestCostNow(costs) {
    var h = getHour();
    return fringeBestCost(h, 23, costs);
}

function limitState(limit, devices) {
    var c = totalConsumption(devices);
    if (c >= limit * 0.90) {
        return 1;
    } else if (c >= limit * 0.70) {
        return 0;
    }
    return -1;
}

function savingDevice(cost, costs, device, devices) {
    return (deviceConsumption(device, devices)*cost.pvpc - deviceCost(device, devices, costs));
}

function limitLight(limit) {
    return(limit<100)
}
