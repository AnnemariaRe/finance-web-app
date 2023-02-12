function onFormSubmit3() {
    let name = document.getElementById("account_name").value;
    let amount = document.getElementById("current_amount").value;
    let currency = document.getElementById("currency").value;
    let type = document.getElementById("account_type").value;

    let submit_info = { name, amount, currency, type };
    console.log(submit_info);
    localStorage.setItem(10000 - localStorage.length + "acc", JSON.stringify(submit_info));
}