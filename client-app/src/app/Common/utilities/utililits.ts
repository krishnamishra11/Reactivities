export const  CombineDateAndTime=(date: Date,time :Date)=>{

    const tstr= time.getHours() + ':' + time.getMinutes()+ ':00';
    const dstr=date.getFullYear()+ '-' +(date.getMonth()+1) + '-' + date.getDate();

    return new Date(dstr+ ' ' + tstr);
}