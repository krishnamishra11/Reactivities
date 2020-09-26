import { IActivity } from "./../../model/IActivity";
import { createContext, SyntheticEvent } from "react";
import { observable, action, computed, configure, runInAction } from "mobx";
import agent from "../API/agent";

configure({ enforceActions: "always" });

class ActivityStore {
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
          activity.date = activity.date.split(".")[0];
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
      });

      this.submmiting = false;
    } catch (error) {
      runInAction("create actio error", () => {
        this.submmiting = false;
      });
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
      });
      this.submmiting = false;
    } catch (error) {
      console.log(error);
      runInAction("create edit error", () => {
        this.submmiting = false;
      });
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
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
 
 return  Object.entries(sactivities.reduce((activities,activity)=>{
    const d=activity.date.split('T')[0];

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
    } else {
      try {
        this.lodingInitials = true;
        activity = await agent.Activities.details(id);

        runInAction("loading details action", () => {

          activity.date = activity.date.split(".")[0];
          this.activity = activity;
          this.lodingInitials = false;
        });
      } catch (error) {
        runInAction("loading details error", () => {
          this.lodingInitials = false;
          console.log(error);
        });
      }
    }
  };
}

export default createContext(new ActivityStore());
