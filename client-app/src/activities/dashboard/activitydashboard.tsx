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
    setselectedactivity:(activity:IActivity|null)=>void;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

const  ActivityDashboard: React.FC<IProp> 
=({activities,
   selectActivity,
   selectedActivity,
   editMode,
   setEditMode,
   setselectedactivity,
   createActivity,
   editActivity,
   deleteActivity,
   submitting})=> {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}  
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && 
                <ActivityDetails  
                    selectedActivity={selectedActivity}
                    setEditMode={setEditMode}
                    setselectedactivity={setselectedactivity}
                />
                }
                {editMode &&
                  <ActivityForm  key ={(selectedActivity && selectedActivity.id) || 0} 
                        activity={selectedActivity!} 
                        setEditMode={setEditMode}
                        createActivity={createActivity}
                        editActivity={editActivity}
                        submitting={submitting}
                        />
                }
            </Grid.Column>

        </Grid>
    )
}


export default ActivityDashboard