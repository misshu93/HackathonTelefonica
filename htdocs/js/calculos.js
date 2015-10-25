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
        sum = sum + parseFloat(devices[count].value);
    }
    return sum;
}

function deviceConsumption(device, devices) {
    var d = getDevice(device, devices);
    if (d.status === "true") {
        return parseFloat(d.value);
    }
    return 0;
}

function nowCost(costs) {
    var h, count;
    h = getHour();
    for (count = 0; count < costs.length; count++) {
        if (costs[count].hour === h) {
            return costs[count].pvpc;
        }
    }
}

function deviceCost(device, devices, cost) {
    return deviceConsumption(device, devices) * nowCost(cost);
}

function deviceStatus(device, devices) {
    var d = getDevice(device, devices);
    return d.metadatas[0].value;
}

function fringeBestCost(fringeInf, fringeSup, costs) {
    var best, count;
    best = null;
    for (count = fringeInf; count <= fringeSup; count++) {
        if (best === null || costs[count].pvpc < best) {
            best = costs[count];
        }
    }
    return best;
}

function getCost(hour, costs) {
    var count;
    for (count = 0; count < costs.length; count++) {
        if (costs[0].hour === hour) {
            return costs[0];
        }
    }
}

function totalCost(devices, cost) {
    return totalConsumption(devices) * nowCost(cost);
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