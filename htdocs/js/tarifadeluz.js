
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
