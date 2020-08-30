import React from 'react'
import { Item,Image, Segment,Button, Label } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity'

interface IProp{
    activities:IActivity[];
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
}
const ActivityList:React.FC<IProp> = ({activities,selectActivity,deleteActivity}) => {
    return (
        <Segment clearing>
        <Item.Group>
        {activities.map((val)=>(
        <Item key={val.id}>
          <Item.Content>
            <Item.Header as='a'>{val.title}</Item.Header>
            <Item.Meta>{val.date}</Item.Meta>
            <Item.Description>
              <div>{val.description}</div>
              <div>{val.venue},{val.city}</div>
            </Item.Description>
            <Item.Extra>
                <Button onClick={()=>selectActivity(val.id) } floated="right" content="View" color="blue" ></Button>
                <Button onClick={()=>deleteActivity(val.id) } floated="right" content="Delete" color="red" ></Button>
                <Label basic content="Category"/>
            </Item.Extra>
          </Item.Content>
        </Item>)
        )}
      </Item.Group>
      </Segment>
    )
}

export default ActivityList
