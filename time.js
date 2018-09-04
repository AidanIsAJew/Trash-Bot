module.exports = {
    run: function() {
        let currentDate = new Date();
        let date = currentDate.getDate();
        let month = currentDate.getMonth();
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        let time = (month + 1) + "/" + date + "/" + year + " " + hour + ":" + minute + ":" + seconds + " : ";
        return time;
    }
}
