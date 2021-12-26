function checkTimeExpired() {
    let date = new Date();
    let timeExpired = new Date(JSON.parse(localStorage.getItem("timeExpired")));

    if(date >= timeExpired) {
        localStorage.setItem("userCurrent", JSON.stringify(''));
    }
}
checkTimeExpired();

function setTimeExpired() {
    let timeExpired = new Date();
    timeExpired.setTime(timeExpired.getTime() + 1 * 24 * 60 * 60 * 1000);
    localStorage.setItem('timeExpired', JSON.stringify(timeExpired.toString()));
}
