
function ponerColor(color) {
    var value = {};

    switch (color)
    {
        case "rojo":
            value.value = "1,0,0";
            break;
        case "verde":
            value.value = "0,1,0";
            break;
        case "azul":
            value.value = "0,0,1";
            break;
    }
    
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
        success: function () {
            if (funcionCallback)
                funcionCallback();
            console.log("llamada color ok");
        },
        error: function () {
            console.log("error al llamar al servidor");
        }
    });
}

function ejecutarSonido(funcionCallback) {
    var value = {};   
    value.value = "1:3:1000:1Cb.C:3F.B";

    $.ajax({
        method: "POST",
        url: "https://thingproxy.freeboard.io/fetch/http://hackathon.ttcloud.net:10026/v1/contextEntities/7WLFOO/attributes/melody",
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
        success: function () {
            if (funcionCallback)
                funcionCallback();
            console.log("llamada sonido ok");
        },
        error: function () {
            console.log("error al llamar al servidor");
        }
    });
}


function obtenerTodosLosDispositivos(funcionCallback) {

    $.ajax({
        method: "GET",
        url: "https://thingproxy.freeboard.io/fetch/http://hackathon.ttcloud.net:10026/v1/contextEntities/7WLFOO/attributes/kwh",
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
            funcionCallback(data);
        },
        error: function () {
            console.log("error al llamar al servidor");
        }
    });
}
