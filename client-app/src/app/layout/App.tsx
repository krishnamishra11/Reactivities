import React, { Component,useState,useEffect,Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { List,Container } from 'semantic-ui-react';
import { IActivity } from '../../model/IActivity';
import { NavBar} from '../../nav/navbar';
import  ActivityDashboard from '../../activities/dashboard/activitydashboard';
import agent from '../API/agent';
import LodingComponent from '../API/LodingComponent';


const App =()=> {
  
  const [activities,setactivities]=useState<IActivity[]>([]);
  const [selectedactivity,setselectedactivity]=useState<IActivity |null>(null);
  const [editMode,setEditMode]=useState(false);

  const [loding,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);

  const handleSelectActivity=(id:string)=>{
    setselectedactivity(activities.filter(a=>a.id==id)[0])
    setEditMode(false);
  }

  const handleCreateActivity=(activity:IActivity)=>{
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
    setactivities([...activities,activity]);
    setselectedactivity(activity);
    setEditMode(false);}).then(()=>setSubmitting(false))
  }
  const handleEditActivity=(activity:IActivity)=>{
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
    setactivities([...activities.filter(q=>q.id!=activity.id),activity]);
    setselectedactivity(activity);
    setEditMode(false);}).then(()=>setSubmitting(false));
  }
  const handleDeleteActivity=(id:string)=>{
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
    setactivities([...activities.filter(q=>q.id!=id)]);
    }).then(()=>setSubmitting(false));
  }
  
  const handleOpenCreateForm=(id:string)=>{
      setEditMode(true);
      setselectedactivity(null);
  }

  useEffect(() => {
   
    agent.Activities.list().then(
      (responce)=>{
         let activitivities:IActivity[]=[];
         responce.forEach(activity=>
          {
            activity.date=activity.date.split('.')[0];
            activitivities.push(activity);
          });
            setactivities(activitivities) 
        }).then(()=>setLoading(false)) }, []);

        if(loding)
          return <LodingComponent content='loding activities'></LodingComponent>
  
    return(
      <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop:'7em'}}  >
        <ActivityDashboard activities={activities} 
                            selectActivity={handleSelectActivity}  
                            selectedActivity={selectedactivity}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            setselectedactivity={setselectedactivity}
                            createActivity={handleCreateActivity}
                            editActivity={handleEditActivity}
                            deleteActivity={handleDeleteActivity}
                            submitting={submitting}
        ></ActivityDashboard>
      </Container>
      </Fragment>
    );
  
  };


export default App;

