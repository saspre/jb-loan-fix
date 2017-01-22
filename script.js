


Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


function parseSaldoToNum(saldo) {
    return parseFloat(saldo.text().replace(".", "").replace(",", "."))
}

function setValue(partSaldoContainer, value) {
    partSaldoContainer.element.text(value.formatMoney(2,',','.'))
}

var partSaldi = function() {

    var saldoContainer = $("span:contains('Totalkonto')").parent().parent().parent().parent().children("div:nth-child(3)")
    var saldoelems = saldoContainer.children(".finansDelsaldo").children(".finansDelsaldoSaldo")

    let partSaldi = {};
    var saldiNames = saldoContainer.children(".finansDelsaldo").children("a").children("span").each(function (i) {
        
        partSaldi[this.innerHTML] = {
            name: this.innerHTML,
            saldo: parseSaldoToNum($(saldoelems.get(i))),
            element: $(saldoelems.get(i))
        };

    })

    var totalElem = $("span:contains('Totalkonto')").parent().parent().parent().children(".bdTextH3");

    partSaldi["Total"] = {
        name: "Total",
        saldo: parseSaldoToNum(totalElem),
        element: totalElem
    }


    return partSaldi;
}();



var total = partSaldi["Total"];
var disponibel = partSaldi["Disponibel"];
var savings = partSaldi["Opsparing"];




setValue(total, total.saldo - savings.saldo)
setValue(disponibel, disponibel.saldo - 20000)

