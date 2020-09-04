import React, { SyntheticEvent, useContext } from 'react'
import { Grid,List } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import {observer} from 'mobx-react-lite'
import ActivityStore from '../../app/store/activityStore'



const  ActivityDashboard: React.FC 
=()=> {
   const {selectedActivity,editMode}=useContext(ActivityStore)
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && 
                <ActivityDetails />
                }
                {editMode &&
                  <ActivityForm  key ={(selectedActivity && selectedActivity.id) || 0}  />
                }
            </Grid.Column>

        </Grid>
    )
}


export default observer(ActivityDashboard)