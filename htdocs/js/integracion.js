
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

    generarAlertas(pintarAlertas);
}

function pintarAlertas(data) {
    var source = $("#avisos").html();
    var template = Handlebars.compile(source);
    $('#alert-placeholder').html(template(data));
}

function generarAlertas(c) {
    limitState(7.02, context);
    c({
	name: "Hola",
	description: "Ninoninonino",
	type: "success"
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

    $("#calcular").click(function () {
        device = document.getElementById("Dispositivo").value;
        var desde = document.getElementById("Desde").value;
        var hasta = document.getElementById("Hasta").value;
        calculo = fringeBestCost(desde, hasta, costes);
        console.log(calculo);
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

