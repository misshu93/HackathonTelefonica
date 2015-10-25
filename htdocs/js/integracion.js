
var context;
var desde,hasta;
var lista;
var costes;
function pintarDispositivo(data){
  var source = $("#dispositivos").html();
  var template = Handlebars.compile(source);
  context = data.attributes[0];
  
  var theCompiledHtml = template(context);

  document.getElementById("consumo").innerHTML =totalConsumption(data.attributes[0].value);
  $('.content-placeholder').html(theCompiledHtml);

}
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

  $( "#Desde" ).click(function() {
      desde = document.getElementById("Desde").value;
        console.log(desde);
      });
  $( "#Hasta" ).click(function() {
      hasta = document.getElementById("Hasta").value;
        console.log(hasta);
      });
  $( "#calcular" ).click(function() {
      device = document.getElementById("Dispositivo").value;
      calculo = fringeBestCost(desde,hasta,costes);
      //console.log(calculo);
      });

});
function preciosHoy(cost) {
    costes = cost;
    console.log(costes);
    document.getElementById("mejor-franja").innerHTML = bestCostNow(costes);
}
obtenerPreciosHoy(preciosHoy);
function listarDispositivo(data){
  lista = data.attributes[0].value;
  $.each(lista,function(i,item){
    $("#Dispositivo").append($("<option>",{
      value: item.name,
      text: item.name
    }))
  }
);

}

function encenderApagarClick(nombre, accion) {
    if (accion == "encender")
        alert("encender: " + nombre);
    else
        alert("apagar: " + nombre);

    encenderApagar(function () { }, context)
}
obtenerTodosLosDispositivos(listarDispositivo);
