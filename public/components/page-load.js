var before = new Date().getTime();
window.onload = Pageloadtime;

function Pageloadtime() {
    var after = new Date().getTime();
    console.log("Page load time: " + (after - before) / 1000 + " sec");
}  