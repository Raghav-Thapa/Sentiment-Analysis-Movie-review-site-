export const numbPadding = (number) =>{
    if(number <10) {
        return "0"+number;
    }
    return number
}

export const formtDate = (date) => {

    let dateObj = new Date(date);
    let month = numbPadding(dateObj.getMonth()+1)
    let day = numbPadding(dateObj.getDate())

    return dateObj.getFullYear()+"-"+month+"-"+day;
}