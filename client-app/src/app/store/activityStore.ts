import { RootStore } from './rootStore';
import { toast } from 'react-toastify';
import { history } from './../../index';
import { IActivity } from "./../../model/IActivity";
import {  SyntheticEvent } from "react";
import { observable, action, computed,  runInAction } from "mobx";
import agent from "../API/agent";



export default class ActivityStore {

  vrootStore:RootStore;
  constructor(rootStore:RootStore)
  {
    this.vrootStore=rootStore;
  }

  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable lodingInitials = false;
  @observable submmiting = false;
  @observable target = "";

  @action loadActivities = async () => {
    this.lodingInitials = true;

    try {
      const activities = await agent.Activities.list();

      runInAction("loging action", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activity=activity;
          this.activityRegistry.set(activity.id, activity);
        });
        this.lodingInitials = false;
      });
    } catch (error) {
      runInAction("loging error", () => {
        this.lodingInitials = false;
        console.log(error);
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submmiting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("create action", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submmiting = false;
      });
      
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction("create actio error", () => {
        this.submmiting = false;
      });
      toast.error('Proplem subbmiting data');
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    try {
      this.submmiting = false;
      await agent.Activities.update(activity);
      runInAction("edit action", () => {
        this.activityRegistry.set(activity.id, activity);

        this.activity = activity;
        this.submmiting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error);
      runInAction("create edit error", () => {
        this.submmiting = false;
      });
      toast.error('Proplem subbmiting data');
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.target = event.currentTarget.name;
    this.submmiting = true;

    try {
      await agent.Activities.delete(id);
      runInAction("delete actio", () => {
        this.activityRegistry.delete(id);
      });
      this.submmiting = false;
      this.target = "";
    } catch (error) {
      console.log(error);
      runInAction("delete actio error", () => {
        this.submmiting = false;
        this.target = "";
      });
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  @computed get activitiesByDate() {
  
    return this.getActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

getActivitiesByDate(actarr:IActivity[])
{
  const sactivities= actarr.sort(
    (a, b) => a.date!.getTime() - b.date!.getTime()
  );
 
 return  Object.entries(sactivities.reduce((activities,activity)=>{
    const d=activity.date!.toISOString().split('T')[0];

    activities[d]=activities[d]? [...activities[d],activity]:[activity];
    return activities;
  },{} as {[key:string]:IActivity[]}));

}

  getActivity = (id: string): IActivity => {
    return this.activityRegistry.get(id);
  };

  @action loadActivity = async (id: string) => {
    var activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      try {
        this.lodingInitials = true;
        activity = await agent.Activities.details(id);

        runInAction("loading details action", () => {

          activity.date = new Date(activity.date);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.lodingInitials = false;
        });
        return activity;
      } catch (error) {
        runInAction("loading details error", () => {
          this.lodingInitials = false;
          console.log(error);
        });
      }
    }
  };
}


