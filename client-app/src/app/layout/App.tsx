import React, { useState,useEffect,Fragment, SyntheticEvent, useContext } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../../model/IActivity';
import { NavBar} from '../../nav/navbar';
import  ActivityDashboard from '../../activities/dashboard/activitydashboard';
import LodingComponent from '../API/LodingComponent';
import {observer} from 'mobx-react-lite'
import ActivityStore from '../store/activityStore';


const App =()=> {
  const activityStore=useContext(ActivityStore);

  useEffect(() => {
   activityStore.loadActivities();
   }, [activityStore]);

        if(activityStore.lodingInitials)
          return <LodingComponent content='loding activities'></LodingComponent>
  
    return(
      <Fragment>
      <NavBar />
      <Container style={{marginTop:'7em'}}  >
        <ActivityDashboard/>
      </Container>
      </Fragment>
    );
  
  };


export default observer(App);

