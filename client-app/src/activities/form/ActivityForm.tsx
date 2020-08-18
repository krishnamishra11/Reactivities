import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Segment,Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity'
import {v4 as uuid} from 'uuid'
interface IProps{
    setEditMode:(editMode:boolean)=>void;
    activity:IActivity;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void
}

const ActivityForm:React.FC<IProps> = ({setEditMode,activity:InsitalActivity,createActivity,editActivity}) => {

    const initialForm=()=>{

        if(InsitalActivity){
            return InsitalActivity;
        } else{
            return { 
                id:'',
                title:'',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:''

            };
        }
    }
    const [activity,setActivity]=useState<IActivity>(initialForm);

    const onsubmit=()=>{
        console.log(activity);
        if(activity.id.length==0)
        {
            let newActivity={...activity,id:uuid()};
            createActivity(newActivity);

        }
        else{
                editActivity(activity)
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
             <Button content='Submit' type='submit' name='' onChange={onChanageEvent} positive floated='right'  ></Button>
             <Button onClick={()=>setEditMode(false)} name='' onChange={onChanageEvent} content='Cancel' type='submit'  floated='right'  ></Button>
         </Form>

    </Segment>
    )
}



export default ActivityForm
