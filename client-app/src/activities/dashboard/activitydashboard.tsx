import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../app/store/activityStore';
import LodingComponent from '../../app/API/LodingComponent';


const  ActivityDashboard: React.FC =()=> {
    const activityStore=useContext(ActivityStore);

    useEffect(() => {
     activityStore.loadActivities();
     }, [activityStore]);
  
          if(activityStore.lodingInitials)
            return <LodingComponent content='loding activities'></LodingComponent>
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
               <h1>Activity Filters...</h1>
            </Grid.Column>

        </Grid>
    )
}


export default observer(ActivityDashboard)