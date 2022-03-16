export const format = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth()
    const day = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    

    if(hours === 12){
        const formated = `${day}/${month}/${year} ${hours}:${minutes}:00 PM`
        return formated;
    }else if(hours > 12) {

        const newHour = hours - 12;
        const formated = `${day}/${month}/${year} ${newHour}:${minutes}:00 PM`;

        return formated;
    }else {
        const formated = `${day}/${month}/${year} ${hours}:${minutes}:00 AM`;

        return formated;
    }
}