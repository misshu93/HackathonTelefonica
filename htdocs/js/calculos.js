"use strict";

function totalConsumption(devices) {
    var d, sum;
    sum = 0;
    for (d in devices) {
        sum = sum + d.value;
    }
    return sum;
}

function deviceConsumption(device, devices) {
    var d;
    for (d in devices) {
        if (d.name === device) {
            return d.value;
        }
    }
    return null;
}

function nowCost(costs) {
    var d, h, c;
    d = new Date();
    h = d.getHours();
    for (c in costs) {
        if (c.hour === h) {
            return c.pvpc;
        }
    }
}

function deviceCost(device, devices, cost) {
    return deviceConsumption(device, devices) * nowCost(cost);
}

function deviceStatus(device, devices) {
    return (deviceConsumption(device, devices) < 0.0000001);
}

function bestCost(costs) {
    var best, c;
    best = null;
    for (c in costs) {
        if (best === null || c.pvpc < bestCost) {
            best = c.pvpc;
        }
    }
    return best;
}

function totalCost(devices, cost) {
    return totalConsumption(devices) * nowCost(cost);
}




