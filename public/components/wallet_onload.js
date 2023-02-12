window.onload = function () {
    const submits = { ...localStorage };

    var i = 0;
    for (let submit in submits) {
        if (submit.endsWith("acc")) {
            let submit_info = JSON.parse(localStorage[submit]);
            document.getElementById("account-table").innerHTML += generateSubmit(submit_info);
            i++;
        } else {
            continue;
        }
    }
}

function generateSubmit(submit_info) {
    var tr = "<tr>";
    if (submit_info.type.endsWith("Основной")) {
        tr += "<td><div class=\"icon\"><i class=\"fa fa-credit-card\"></i></div></td>";
    } else {
        tr += "<td><div class=\"icon\"><i class=\"fa fa-fa-bank\"></i></div></td>";
    }
    tr += "<td>" + submit_info.name + "<div class=\"subtitle\">Название</div></td>";
    tr += "<td>" + submit_info.amount + "<div class=\"subtitle\">Количество</div></td>";
    if (submit_info.currency.endsWith("рубль")) {
        tr += "<td><div class=\"currency\">Российский рубль</div><i class=\"fa fa-ruble\"></i><div class=\"subtitle\">Валюта</div></td>";
    } else if (submit_info.currency.endsWith("Евро")) {
        tr += "<td><div class=\"currency\">Евро</div><i class=\"fa fa-euro\"></i><div class=\"subtitle\">Валюта</div></td>";
    } else if (submit_info.currency.endsWith("Доллар")) {
        tr += "<td><div class=\"currency\">Доллар</div><i class=\"fa fa-dollar\"></i><div class=\"subtitle\">Валюта</div></td>";
    }
    tr += "<td><div class=\"active\"><i class=\"fa fa-circle\"></i><span class=\"btn-a\">Активный</span></div></td>";
    tr += "<td class=\"type\">" + submit_info.type + "<br><span class=\"type\">Тип счета</span></td>";
    tr += "<td><a href=\"#\" class=\"button\"><i class=\"fa fa-edit\"></i></a></td></tr>";

    return tr;
}