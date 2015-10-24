"use strict";

function getHour() {
    var d;
    d = new Date();
    return d.getHours();
}

function getDevice(device, devices) {
    var d;
    for (d in devices) {
        if (d.name === device) {
            return d;
        }
    }
}

function totalConsumption(devices) {
    var d, sum;
    sum = 0;
    for (d in devices) {
        sum = sum + d.value;
    }
    return sum;
}

function deviceConsumption(device, devices) {
    var d = getDevice(device, devices);
    return d.value;
}

function nowCost(costs) {
    var h, c;
    h = getHour();
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
        if (best === null || c.pvpc < best) {
            best = c;
        }
    }
    return best;
}

function getCost(hour, costs) {
    var c;
    for (c in costs) {
        if (c.hour === hour) {
            return c;
        }
    }
}

function totalCost(devices, cost) {
    return totalConsumption(devices) * nowCost(cost);
}

function fringeDevice(fringeInf, fringeSup, device, devices, cost) {
    var c, i, d;
    d = getDevice(device, devices);
    c = [];
    i = fringeInf;
    while (i <= fringeSup) {
        c.push(getCost(i, cost));
        i = i + 1;
    }
    bestCost(c);
}


