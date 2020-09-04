import React, { useContext } from 'react'
import { Card,Image,ButtonGroup,Button } from 'semantic-ui-react'
import ActivityStore from '../../app/store/activityStore'
import {observer} from 'mobx-react-lite'

const ActivityDetails:React.FC = () => {
  const{selectedActivity,openEditForm,cancleSelectedActivity}=useContext(ActivityStore);
    return (
        <Card fluid>
        <Image src={`/assetes/categoryImages/${selectedActivity!.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{selectedActivity!.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{selectedActivity!.date}</span>
          </Card.Meta>
          <Card.Description>
            {selectedActivity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2} >
                 <Button onClick={()=>openEditForm(selectedActivity!.id)}   content="Edit" color="blue"></Button> 
                 <Button onClick={()=>cancleSelectedActivity()}  content="Cancel" color="grey" ></Button> 
          </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

ActivityDetails.propTypes = {

}

export default observer(ActivityDetails)
