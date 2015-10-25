
var context;
var desde, hasta;
var lista;
var costes;
function pintarDispositivo(data) {
    var source = $("#dispositivos").html();
    var template = Handlebars.compile(source);
    context = data.attributes[0];

    var theCompiledHtml = template(context);

    $("#consumo").text(totalCost(data.attributes[0].value, costes) + "€ / hora");
    $("#precioKwhActual").text(nowCost(costes).pvpc + "€");
    $('.content-placeholder').html(theCompiledHtml);

}

function pintarAlertas() {
    var source = $("#avisos").html();
    var template = Handlebars.compile(source);
    context = {
        name: "Hola",
        description: "Ninoninonino",
        type: "success"
    };
    $('#alert-placeholder').html(template(context));
}

obtenerTodosLosDispositivos(pintarDispositivo);
pintarAlertas();

$(document).ready(function () {

    Handlebars.registerHelper('ifStatus', function (options) {
        status = this.metadatas[0].value;
        if (status == "true") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        };
    });

    $("#Desde").click(function () {
        desde = document.getElementById("Desde").value;
        console.log(desde);
    });
    $("#Hasta").click(function () {
        hasta = document.getElementById("Hasta").value;
        console.log(hasta);
    });
    $("#calcular").click(function () {
        device = document.getElementById("Dispositivo").value;
        calculo = fringeBestCost(desde, hasta, costes);
        //console.log(calculo);
    });

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

function encenderApagarClick(nombre, accion) {
    //modificar context para encender o apagar
    //pasar a context

    for (i in context.value) {
        //console.log(context.value[i]);
        if (context.value[i].name == nombre) {
            var encendido = !(context.value[i].metadatas[0].value);

            encendido = encendido.toString();
            context.value[i].metadatas[0].value = encendido;

        }
    }
    if (accion == "encender")
        alert("encender: " + nombre);
    else
        alert("apagar: " + nombre);
    console.log(context);
    encenderApagar(function () { }, context);
}
obtenerTodosLosDispositivos(listarDispositivo);

