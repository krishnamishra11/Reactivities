import React from 'react'
import { Grid,List } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProp{
    activities:IActivity[];
    selectActivity:(id:string)=>void;
    selectedActivity:IActivity | null
    editMode:boolean;
    setEditMode:(editMode:boolean)=>void;
}

const  ActivityDashboard: React.FC<IProp> 
=({activities,selectActivity,selectedActivity,editMode,setEditMode})=> {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}  
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && 
                <ActivityDetails 
                    selectedActivity={selectedActivity}
                />
                }
                {editMode &&
                  <ActivityForm />
                }
            </Grid.Column>

        </Grid>
    )
}


export default ActivityDashboard