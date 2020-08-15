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
  }

  const handleOpenCreateForm=(id:string)=>{
      setEditMode(true);
  }

  useEffect(() => {

    axios.get<IActivity[]> ('http://localhost:5000/Activities').then(
      (responce)=>{
            setactivities(responce.data) 
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
        ></ActivityDashboard>
      </Container>
      </Fragment>
    );
  
  };


export default App;

