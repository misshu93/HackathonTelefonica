"use strict";

function totalConsumption(devices) {
    var d, sum;
    sum = 0;
    for (d in devices) {
        sum = sum + d.value;
    }
    return sum;
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
