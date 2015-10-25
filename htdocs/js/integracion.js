
var context;
var desde,hasta;
var lista;
var costes;
function pintarDispositivo(data){
  var source = $("#dispositivos").html();
  var template = Handlebars.compile(source);
  context = data.attributes[0];
  Handlebars.registerHelper('encendido', function(name) {
    status = deviceStatus(name,context.value)

    if (status == "true"){
      status = "Encendido";
    }else{
      status = "Apagado";
    }
    return status;
  });
  Handlebars.registerHelper('activar', function(name) {
    status = this.metadatas[0].value;
    if (status == "true"){
      activar = "Apagar";
    }else{
      activar = "Encender";
    }
    return activar;
  });
  var theCompiledHtml = template(context);

  document.getElementById("consumo").innerHTML =totalConsumption(data.attributes[0].value);
  $('.content-placeholder').html(theCompiledHtml);

}
obtenerTodosLosDispositivos(pintarDispositivo);

$(document).ready(function () {

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
function preciosHoy(costes){
  console.log(costes);
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
obtenerTodosLosDispositivos(listarDispositivo);
document.getElementById("mejor-franja").innerHTML = bestCostNow(costes);
