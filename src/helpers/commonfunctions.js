const formattedTime = (time) => {
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    let hrs = time.getHours();
    return appendZero(hrs)+":"+appendZero(mins)+":"+appendZero(secs)
}

const appendZero = (number) => {
    let str = number
    if(str <= 9 ){
        str = "0"+str
    }
    return str
}
module.exports = { formattedTime, appendZero } 