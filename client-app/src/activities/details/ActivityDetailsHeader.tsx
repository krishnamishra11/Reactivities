import { observer } from 'mobx-react-lite';
import React from 'react'
import { Item, Segment,Image,Header, Button } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity';
const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

export const ActivityDetailsHeader:React.FC<{activity:IActivity}> = ({activity}) => {
    return (
            <Segment.Group>
              <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assetes/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style ={activityImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size='huge'
                          content={'Title'}
                          style={{ color: 'white' }}
                        />
                        <p>{activity.date}</p>
                        <p>
                          Hosted by <strong>Bob</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                  Manage Event
                </Button>
              </Segment>
            </Segment.Group>
    )
}

export default observer(ActivityDetailsHeader)