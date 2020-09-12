import React, { useContext, useEffect } from 'react'
import { Card,Image,ButtonGroup,Button } from 'semantic-ui-react'
import ActivityStore from '../../app/store/activityStore'
import {observer} from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../app/API/LodingComponent'

interface ParamDetails{
  id:string;
}

const ActivityDetails:React.FC<RouteComponentProps<ParamDetails>> = ({match,history}) => {



  const{activity,loadActivity,lodingInitials}=useContext(ActivityStore);

  useEffect(() => {
    loadActivity(match.params.id)
  },[loadActivity,match.params.id]);

if(lodingInitials || !activity) return <LoadingComponent content='loading contents......' />

    return (
        <Card fluid>
        <Image src={`/assetes/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2} >
                 <Button as={Link} to={`/manage/${activity!.id}`} content="Edit" color="blue"></Button> 
                 <Button onClick={()=>history.push('/activities')}  content="Cancel" color="grey" ></Button> 
          </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

ActivityDetails.propTypes = {

}

export default observer(ActivityDetails)
