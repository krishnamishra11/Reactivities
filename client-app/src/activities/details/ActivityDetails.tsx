import React from 'react'
import PropTypes from 'prop-types'
import { Card,Icon,Image,ButtonGroup,Button } from 'semantic-ui-react'
import { IActivity } from '../../model/IActivity'

interface IProp{
    selectedActivity:IActivity;
    setEditMode:(editMode:boolean)=>void;
}

const ActivityDetails:React.FC<IProp> = ({selectedActivity,setEditMode}) => {
    return (
        <Card fluid>
        <Image src={`/assetes/categoryImages/${selectedActivity.category}.png`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{selectedActivity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{selectedActivity.date}</span>
          </Card.Meta>
          <Card.Description>
            {selectedActivity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2} >
                 <Button onClick={()=>setEditMode(true)}   content="Edit" color="blue"></Button> 
                 <Button content="Cancel" color="grey" ></Button> 
          </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

ActivityDetails.propTypes = {

}

export default ActivityDetails
