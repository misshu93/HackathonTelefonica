
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

function encenderApagar(funcionCallback, dispositivos) {
    //var value = '{    "type": "dispositives",    "value": [    { "name":"Microondas",        "type":"float",        "value":"0.640",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Horno",        "type":"float",        "value":"0.790",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "0"        }        ]    },{        "name":"Ordenador Papa",        "type":"float",        "value":"0.120",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "0"        }        ]    },{        "name":"Nevera",        "type":"float",        "value":"0.890",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Router",        "type":"float",        "value":"0.01012",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Fogon 1",        "type":"float",        "value":"1.2",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Estufa Salon",        "type":"float",        "value":"2",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Lavadora",        "type":"float",        "value":"0.350",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]    },{        "name":"Lavavajillas",        "type":"float",        "value":"0.980",        "metadatas":[        {            "name": "status",            "type": "boolean",            "value": "1"        }        ]}]    }';
    delete dispositivos['name'];
    $.ajax({
        method: "POST",
        url: "https://thingproxy.freeboard.io/fetch/http://hackathon.ttcloud.net:10026/v1/contextEntities/7WLFOO/attributes/kwh",
        data: JSON.stringify(dispositivos),
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
            console.log("encender apagar ok");
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

function obtenerPreciosHoy(funcionCallback) {

    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth()+1;
    var anyo = fecha.getFullYear();
   

    $.ajax({
        method: "GET",
        url: "http://localhost/db/"+anyo+"/"+mes+"/"+dia+"",
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

function insertarPrecios(funcionCallback,arrayPrecios) {
    
    $.ajax({
        method: "POST",
        url: "http://localhost/db",
        data: JSON.stringify(arrayPrecios),
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function (data) {
            if (funcionCallback)
                funcionCallback(data);
        },
        error: function (xhr, a, b) {
            if(xhr.status != 200)
                console.log("error al llamar al servidor");
            else
                if (funcionCallback)
                    funcionCallback();
        }
    });
}
