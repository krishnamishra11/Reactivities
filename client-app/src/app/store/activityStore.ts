import { IActivity } from './../../model/IActivity';
import { createContext, SyntheticEvent } from "react";
import {observable, action, computed,configure,runInAction} from 'mobx';
import agent from '../API/agent';

configure({enforceActions:'always'} )

class ActivityStore{
    @observable activityRegistry=new Map();
    //@observable activities:IActivity[]=[];
    @observable selectedActivity:IActivity| undefined=undefined;
    @observable lodingInitials =false;
    @observable editMode=false;
    @observable submmiting=false;
    @observable target='';


    @action loadActivities=async()=>{
    this.lodingInitials=true;

    try{
    const activities= await agent.Activities.list();

    runInAction('loging action',()=>
    {
      activities.forEach(activity=>
      {
        activity.date=activity.date.split('.')[0];
        this.activityRegistry.set(activity.id,activity);
      });
    });
      this.lodingInitials=false;   
  }catch(error){
    runInAction('loging error',()=>{
      this.lodingInitials=false;   
    })
    console.log(error);
  }

    }

    @action createActivity=async(activity:IActivity)=>{
      this.submmiting=true;
      try{
      await agent.Activities.create(activity);
      runInAction('create action',()=>
      {
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity=activity;
      })

      this.editMode=false;
      this.submmiting=false;
      }catch(error)
      {
        runInAction('create actio error',()=>
        {
          this.submmiting=false;
        })
        console.log(error);

      }
    }

@action editActivity=async(activity:IActivity)=>{
  try{
  this.submmiting=false;
  await agent.Activities.update(activity);
  runInAction('edit action',()=>
  {
  this.activityRegistry.set(activity.id,activity);

  this.selectedActivity=activity;
  })
  this.editMode=false;
  this.submmiting=false;
  }catch(error)
  {
    console.log(error);
    runInAction('create edit error',()=>
    {
    this.submmiting=false;
    })
  }

}

@action deleteActivity=async(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
  this.target=event.currentTarget.name;
  this.submmiting=true;

  try{
    await agent.Activities.delete(id);
    runInAction('delete actio',()=>
    {
    this.activityRegistry.delete(id);
    })
    this.submmiting=false;
    this.target='';
  }catch(error)
  {
    console.log(error);
    runInAction('delete actio error',()=>
    {
    this.submmiting=false;
    this.target='';
    });

  }
  
}

    @action openCreateForm=()=>
    {
      this.editMode=true;
      this.selectedActivity=undefined;
    }
    @action cancleSelectedActivity=()=>
    {
      this.selectedActivity=undefined;
    }
    @action CancleFormOpen=()=>
    {
      this.editMode=false;
    }
    @action openEditForm=(id:string)=>
    {
      this.editMode=true;
      this.selectedActivity=this.activityRegistry.get(id);
    }

    @action selectActivity=(id:string)=>{
        this.selectedActivity=this.activityRegistry.get(id);
        this.editMode=false;
    }          

    @computed get activitiesByDate() {
      return Array.from( this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }

}


export default createContext(new ActivityStore);