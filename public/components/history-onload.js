window.onload = function () {
    const submits = { ...localStorage };

    for (let submit in submits) {
        if (submit.endsWith("acc")) { continue; }
        let submit_info = JSON.parse(localStorage[submit]);
    }

    $(document).ready( function () {
        $('#history2').DataTable( {
            searching: true,
            "lengthChange": false,
            "pageLength": 20,
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
    } );
}