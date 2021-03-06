
var context;
var desde, hasta;
var lista;
var costes;
function pintarDispositivo(data) {
    var source = $("#dispositivos").html();
    var template = Handlebars.compile(source);
    context = data.attributes[0];

    var theCompiledHtml = template(context);

    $("#consumo").text(totalCost(data.attributes[0].value, costes) + " € / hora");
    $("#precioKwhActual").text(nowCost(costes).pvpc + "€");
        $('.content-placeholder').html(theCompiledHtml);

    var alertas = [];
    generarAlertaEnergia(alertas);
    generarAlertaLuz(alertas, pintarAlertas);
}

function refrescarDispositivos(data) {
    var source = $("#dispositivos").html();
    var template = Handlebars.compile(source);
    var theCompiledHtml = template(data);
    $('.content-placeholder').empty().html(theCompiledHtml);
    $("#consumo").text(totalCost(data.value, costes) + " € / hora");
    var alertas = [];
    generarAlertaEnergia(alertas);
    generarAlertaLuz(alertas, pintarAlertas);
}

function pintarAlertas(data) {
    var source = $("#avisos").html();
    var template = Handlebars.compile(source);
    $('#alert-placeholder').html(template(data));
}

function generarAlertaEnergia(alerts) {
    // Consumo eléctrico
    var isPowerExceeded = limitState(7.02, context.value);
    if (isPowerExceeded == 1) {
	alerts.push({
	    name: "Consumo eléctrico",
	    description: "Se está acercando al límite",
	    type: "danger"
	});
	ponerColor("rojo");
    ejecutarSonido("1:1:1:1:1:1:1");
    } else if (isPowerExceeded == 0) {
	alerts.push({
	    name: "Consumo eléctrico",
	    description: "El consumo es alto",
	    type: "warning"
	});
	ponerColor("amarillo");
    ejecutarSonido("0");
    } else {
	alerts.push({
	    name: "Consumo eléctrico",
	    description: "No hay problemas con el consumo",
	    type: "success"
	});
	ponerColor("verde");
    ejecutarSonido("0");
    };
    return alerts;
}

function generarAlertaLuz(alerts, c) {
    obtenerLuminosidad(function(data){
	var isLightExceeded = !limitLight(data['attributes'][0]['value']);
	if (isLightExceeded) {
	    alerts.push({
		name: "Iluminación",
		description: "La iluminación es adecuada",
		type: "info"
	    });
	    c(alerts);
	} else {
	    alerts.push({
		name: "Iluminación",
		description: "La iluminación es insuficiente",
		type: "danger"
	    });
	    console.log(alerts);
	    c(alerts);
	};
    });
};

obtenerTodosLosDispositivos(pintarDispositivo);

$(document).ready(function () {

    Handlebars.registerHelper('ifStatus', function (options) {
        status = this.metadatas[0].value;
        if (status == "true") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        };
    });
        listarHorasDesde(listarHorasHasta);
      $( "#Desde" ).change(function() {
          $("#Hasta").empty();
          listarHorasHasta();
      });

});
$("#calcular").click(function () {
    device = document.getElementById("Dispositivo").value;
    var desde = document.getElementById("Desde").value;
    var hasta = document.getElementById("Hasta").value;
    var mejorFranja = fringeBestCost(desde, hasta, costes);
    var ahorroLimitado = savingDevice(mejorFranja, costes, device,context.value);
    var mejorFranjaDia = bestCostNow(costes).hour + ":00 - " + (bestCostNow(costes).hour + 1) + ":00"
    var ahorroDia = savingDevice(bestCostNow(costes), costes, device,context.value);
    $("#mejor-franja-mejor").empty();
    $("#ahorro-limitado").empty();
    $("#mejor-franja-dia").empty();
    $("#ahorro-dia").empty();
    $("#mejor-franja-mejor").append(mejorFranja.hour + ":00 - " + (mejorFranja.hour + 1) + ":00");
    $("#ahorro-limitado").append(ahorroLimitado.toFixed(4));
    $("#mejor-franja-dia").append(mejorFranjaDia);
    $("#ahorro-dia").append(ahorroDia.toFixed(4));
    calculo = fringeBestCost(desde, hasta, costes);
    console.log(calculo);
    $("#datos").show(500);
});
function preciosHoy(cost) {
    costes = cost;
    console.log(costes);
    document.getElementById("mejor-franja").innerHTML = bestCostNow(costes).hour + ":00 - " + (bestCostNow(costes).hour + 1) + ":00";
}
obtenerPreciosHoy(preciosHoy);
function listarDispositivo(data) {
    lista = data.attributes[0].value;
    $.each(lista, function (i, item) {
        $("#Dispositivo").append($("<option>", {
            value: item.name,
            text: item.name
        }))
    }
  );

}


function listarHorasDesde(fun){
  var count;
    for(count = getHour();count<24; count++){
        $("#Desde").append($("<option>",{
      value: count,
      text: count
    }))
    }
    if(fun != null){
        fun();
    }

}

function listarHorasHasta(){
  var count;
    for(count = parseInt(document.getElementById("Desde").value)+1;count<25; count++){
        $("#Hasta").append($("<option>",{
      value: count,
      text: count
    }))
    }
}


function encenderApagarClick(nombre, accion) {
    //modificar context para encender o apagar
    //pasar a context

    for (i in context.value) {
        //console.log(context.value[i]);
        if (context.value[i].name == nombre) {
            var encendido;

            if (accion == "encender")
                encendido = "false";
            else
                encendido = "true";
            context.value[i].metadatas[0].value = encendido;

        }
    }
    console.log(context);
    encenderApagar(function () { refrescarDispositivos(context); }, context);
}
obtenerTodosLosDispositivos(listarDispositivo);
