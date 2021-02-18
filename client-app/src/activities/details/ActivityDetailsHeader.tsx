import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Item, Segment,Image,Header, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/store/rootStore';
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
  const rootStore= useContext(RootStoreContext);
  const {loading, attendActivity,cancelActivity}=rootStore.activityStore;
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
                          content={activity.title}
                          style={{ color: 'white' }}
                        />
                        <p>{format(activity.date,'eeee do MMMM')} at {format(activity.date,'h:mm a')}</p>
                        <p>
                          Hosted by <strong>Bob</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>
                {activity.isHost?(<Button loading={loading} as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>Manage Event</Button>):
                 (activity.isGoing?(<Button loading={loading} onClick={cancelActivity} >Cancel attendance</Button>):
                 (<Button onClick={attendActivity} color='teal'>Join Activity</Button>))}
              </Segment>
            </Segment.Group>
    )
}

export default observer(ActivityDetailsHeader)