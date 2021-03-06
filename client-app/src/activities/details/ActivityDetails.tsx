import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import {observer} from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../app/API/LodingComponent'
import ActivityDetailsHeader from './ActivityDetailsHeader'
import { ActivityDetailsInfo } from './ActivityDetailsInfo'
import { ActivityDetailsChat } from './ActivityDetailsChat'
import { RootStoreContext } from '../../app/store/rootStore'
import ActitivityDetailsSidebar from './ActitivityDetailsSidebar'

interface ParamDetails{
  id:string;
}

const ActivityDetails:React.FC<RouteComponentProps<ParamDetails>> = ({match}) => {



  const{activity,loadActivity,lodingInitials}=useContext(RootStoreContext).activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  },[loadActivity,match.params.id]);

if(lodingInitials ) return <LoadingComponent content='loading contents......' />
if(!activity)
  return <h1>not found</h1>;
  
    return (
       <Grid>
         <Grid.Column width={10}>
           <ActivityDetailsHeader activity={activity}/>
           <ActivityDetailsInfo activity={activity}/>
           <ActivityDetailsChat/>
         </Grid.Column>
         <Grid.Column width={6}>
          <ActitivityDetailsSidebar attendees={activity.attendees}/>
         </Grid.Column>
       </Grid>
    )
}

ActivityDetails.propTypes = {

}

export default observer(ActivityDetails)
