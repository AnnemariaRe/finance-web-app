window.onload = function () {

    getCurrency('https://api.currencyapi.com/v3/latest?apikey=uB9jmOX6xlypRBtHq65elzi5AZAaUI27vSXSniFo&currencies=EUR%2CUSD%2CUAH%2CKZT&base_currency=RUB')
    .then(response => JSON.parse(response))
    .then(data => setTimeout(() => { 
        document.getElementById("exchange").innerHTML += generateSubmitFromAPI(data.data.EUR);
        document.getElementById("exchange").innerHTML += generateSubmitFromAPI(data.data.USD);
        document.getElementById("exchange").innerHTML += generateSubmitFromAPI(data.data.UAH);
        document.getElementById("exchange").innerHTML += generateSubmitFromAPI(data.data.KZT);
    }, 1000))
    .catch(error => { 
        console.error(error);
    });

    $(document).ready(function () {
        $('#history').DataTable({
            searching: false,
            "lengthChange": false,
            "pageLength": 15,
            "processing": true,
            language: {
                zeroRecords: 'Ничего не найдено',
                infoEmpty: 'Нет доступных записей',
                info: "Показано с _START_ по _END_ из _TOTAL_ записей",
                infoEmpty: "Показано с 0 по 0 из 0 записей",
                paginate: {
                    "next": "Следующий",
                    "previous": "Предыдущий"
                },
                search: "Поиск:"
            },
        });
    });
}

function getCurrency(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error :("));
        };
        xhr.send();
    });
}

function generateSubmitFromAPI(submit_info) {
    var tr = "<tr>";
    tr += "<td>" + submit_info["code"] + "</td>";
    tr += "<td><b>" + submit_info["value"] + "</b></td>";
    tr += "</tr>";

    return tr;
}