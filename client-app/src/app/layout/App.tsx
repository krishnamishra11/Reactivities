import React, { Component,useState,useEffect,Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { List,Container } from 'semantic-ui-react';
import { IActivity } from '../../model/IActivity';
import { NavBar} from '../../nav/navbar';
import  ActivityDashboard from '../../activities/dashboard/activitydashboard';



const App =()=> {
  
  const [activities,setactivities]=useState<IActivity[]>([]);
  const [selectedactivity,setselectedactivity]=useState<IActivity |null>(null);
  const [editMode,setEditMode]=useState(false);

  const handleSelectActivity=(id:string)=>{
    setselectedactivity(activities.filter(a=>a.id==id)[0])
    setEditMode(false);
  }

  const handleCreateActivity=(activity:IActivity)=>{
    setactivities([...activities,activity]);
    setselectedactivity(activity);
    setEditMode(false);
  }
  const handleEditActivity=(activity:IActivity)=>{
    setactivities([...activities.filter(q=>q.id!=activity.id),activity]);
    setselectedactivity(activity);
    setEditMode(false);
  }

  const handleOpenCreateForm=(id:string)=>{
      setEditMode(true);
      setselectedactivity(null);
  }

  useEffect(() => {

    axios.get<IActivity[]> ('http://localhost:5000/Activities').then(
      (responce)=>{
         let activitivities:IActivity[]=[];
         responce.data.forEach(activity=>
          {
            activity.date=activity.date.split('.')[0];
            activitivities.push(activity);
          });
            setactivities(activitivities) 
        }) }, []);
  
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
        ></ActivityDashboard>
      </Container>
      </Fragment>
    );
  
  };


export default App;

