function onExpenseFormSubmit() {
    let amount = document.getElementById("expense_amount").value;
    let category = document.getElementById("expense_category").value;
    let account = document.getElementById("account1").value;
    let date = document.getElementById("today1").value;
    let check = document.getElementById("check1").value;

    let submit_info = { amount, category, account, date, check };
    localStorage.setItem(10000 - localStorage.length, JSON.stringify(submit_info));
}