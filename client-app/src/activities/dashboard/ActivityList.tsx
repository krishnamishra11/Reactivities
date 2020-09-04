import React, {  useContext } from 'react'
import { Item, Segment,Button, Label } from 'semantic-ui-react'
import StoreActivity from '../../app/store/activityStore'
import {observer} from 'mobx-react-lite'

const ActivityList:React.FC = () => {
  const {selectActivity,activitiesByDate,deleteActivity,submmiting,target}=useContext(StoreActivity);
    return (
        <Segment clearing>
        <Item.Group>
        {activitiesByDate.map((val)=>(
        <Item key={val.id}>
          <Item.Content>
            <Item.Header as='a'>{val.title}</Item.Header>
            <Item.Meta>{val.date}</Item.Meta>
            <Item.Description>
              <div>{val.description}</div>
              <div>{val.venue},{val.city}</div>
            </Item.Description>
            <Item.Extra>
                <Button  
                
                onClick={()=>selectActivity(val.id) } 
                floated="right" 
                content="View" 
                color="blue" >
                </Button>
                <Button 
                name={val.id}
                loading={target===val.id &&  submmiting} 
                onClick={ (e)=>deleteActivity(e,val.id) } 
                floated="right" 
                content="Delete" 
                color="red" >
                </Button>

                <Label basic content="Category"/>
            </Item.Extra>
          </Item.Content>
        </Item>)
        )}
      </Item.Group>
      </Segment>
    )
}

export default observer(ActivityList)
