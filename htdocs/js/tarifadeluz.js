
function obtenerDatosTarifaHoy() {
    var obj = {};
    var consumoHoras = [];
    $.get("https://thingproxy.freeboard.io/fetch/http://www.tarifadeluz.com/index.php", function (data) {
        $(data).find("table[width=500]").find("tr:not(:first)").each(function (index, item) {
            var listatd = $(item).find("td");

            var consumo = {};
            consumo.horario = $(listatd[0]).find("b").text();
            consumo.valorTarifaGeneral = $(listatd[1]).find("b").text();            

            consumoHoras.push(consumo);
        });

        obj.Horas = consumoHoras;
        obj.Fecha = new Date();

        $.ajax({
            method: "POST",
            url: "/db",
            data: JSON.stringify(consumoHoras),
            dataType: "json",
            contentType: "application / json",
            success: function () {
                console.log("datos guardados");
            },
            error: function (xhr, a, b) {
                console.log("error al llamar al servidor");
            }
        });
    });

   
}

function obtenerDatosTarifaAyer() {

    var consumoHoras = [];
    $.get("https://thingproxy.freeboard.io/fetch/http://www.tarifadeluz.com/ayer.php", function (data) {
        $(data).find("table[width=500]").find("tr:not(:first)").each(function (index, item) {
            var listatd = $(item).find("td");

            var consumo = {};
            consumo.horario = $(listatd[0]).find("b").text();
            consumo.valorTarifaGeneral = $(listatd[1]).find("b").text();            

            consumoHoras.push(consumo);
        });

        obj.Horas = consumoHoras;
        obj.Fecha = new Date();
        obj.Fecha.setDate(obj.Fecha.getDate() - 1);

        $.ajax({
            method: "POST",
            url: "/db",
            data: JSON.stringify(consumoHoras),
            dataType: "json",
            contentType: "application / json",
            success: function () {
                console.log("datos guardados");
            },
            error: function () {
                console.log("error al llamar al servidor");
            }
        });
    });    
}

function pruebas() {

    $.ajax({
        method: "GET",
        url: "https://thingproxy.freeboard.io/fetch/http://hackathon.ttcloud.net:10026/v1/contextEntities/7WLFOO/attributes/temperature",
        data: null,
        dataType: "json",
        contentType: "application / json",
        beforeSend: function (request) {
            request.setRequestHeader("Fiware-Service", "todosincluidos");
            request.setRequestHeader("Fiware-ServicePath", "/iot");
            request.setRequestHeader("Access-Control-Allow-Origin", "http://localhost.com");
            request.setRequestHeader("X-Auth-Token", "25069ba02efb4e5293f8e3f1e9fe7d81");
            request.setRequestHeader("Accept", "application/json");

        },
        success: function (data) {
            console.log("datos:" + data);
        },
        error: function () {
            console.log("error al llamar al servidor");
        }
    });
}

function pruebas2() {
    var value = {};
    value.value = "0,1,0";
    $.ajax({
        method: "POST",
        url: "https://thingproxy.freeboard.io/fetch/http://hackathon.ttcloud.net:10026/v1/contextEntities/7WLFOO/attributes/color",
        data: JSON.stringify(value),
        dataType: "json",
        contentType: "application / json",
        beforeSend: function (request) {
            request.setRequestHeader("Fiware-Service", "todosincluidos");
            request.setRequestHeader("Fiware-ServicePath", "/iot");
            request.setRequestHeader("Access-Control-Allow-Origin", "http://localhost.com");
            request.setRequestHeader("X-Auth-Token", "25069ba02efb4e5293f8e3f1e9fe7d81");
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");

        },
        success: function (data) {
            console.log("datos:" + data);
        },
        error: function () {
            console.log("error al llamar al servidor");
        }
    });

}
