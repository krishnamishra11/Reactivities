import React, { useState, useEffect, FormEvent, useContext } from 'react'
import { Segment,Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity'
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../app/store/activityStore'
import {observer} from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
interface ParmDetails{
    id:string
}

const ActivityForm:React.FC<RouteComponentProps<ParmDetails>> = ({match,history}) => {
   const { createActivity,
    editActivity,
    submmiting,activity:intialiseFormState,
    loadActivity,
    clearActivity}=useContext(ActivityStore)


    const [activity,setActivity]=useState<IActivity>( { 
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:''

    });

   useEffect(() => {
       if(match.params.id && activity.id.length===0)
       {
           loadActivity(match.params.id).then (()=>intialiseFormState && setActivity(intialiseFormState));
       }
       return (()=>clearActivity())
       
   },[loadActivity,clearActivity,match.params.id,intialiseFormState,activity.id.length])

    
    

    const onsubmit=()=>{
  
        if(activity.id.length===0)
        {
            let newActivity={...activity,id:uuid()};
            createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));

        }
        else{
                editActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
        }
    }
    const onChanageEvent=(event:FormEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value}=event.currentTarget;
        setActivity({...activity,[name]:value});
    }

    return (
    <Segment clearing>
         <Form onSubmit={onsubmit}> 
             <Form.Input placeholder="Title" name='title' onChange={onChanageEvent} value={activity.title}></Form.Input>
             <Form.TextArea rows={2} name='description' onChange={onChanageEvent} value={activity.description} placeholder="Description" ></Form.TextArea>
             <Form.Input placeholder="Category" name='category' onChange={onChanageEvent} value={activity.category} ></Form.Input>
             <Form.Input type="datetime-local" placeholder="Date" name='date' onChange={onChanageEvent} value={activity.date} ></Form.Input>
             <Form.Input placeholder="City" name='city' onChange={onChanageEvent} value={activity.city} ></Form.Input>
             <Form.Input placeholder="Venue" name='venue' onChange={onChanageEvent} value={activity.venue} ></Form.Input>
             <Button loading={submmiting} content='Submit' type='submit' name='submit' positive floated='right'  ></Button>
             <Button onClick={()=>history.push(`/activities/${activity.id}`)} name='Cancel' content='Cancel' type='button'  floated='right'  ></Button>
         </Form>

    </Segment>
    )
}



export default observer(ActivityForm)
