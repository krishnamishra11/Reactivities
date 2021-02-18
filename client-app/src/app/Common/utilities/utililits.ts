import { IActivity, IAttendee } from "../../../model/IActivity";
import { IUser } from "../../../model/User";

export const  CombineDateAndTime=(date: Date,time :Date)=>{

    const tstr= time.getHours() + ':' + time.getMinutes()+ ':00';
    const dstr=date.getFullYear()+ '-' +(date.getMonth()+1) + '-' + date.getDate();

    return new Date(dstr+ ' ' + tstr);
}

export const  UpdateUserProperty=(activity: IActivity, user:IUser )=> {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(
      a => a.username === user?.username
    );
    activity.isHost = activity.attendees.some(
      a => a.username === user?.username && a.isHost
    );

    return activity;
}

export const createAttendee=(user:IUser):IAttendee=>{

  return {
    displayName:user.displayName,
    isHost:false,
    username:user.username,
    image:user.image!

  }
}