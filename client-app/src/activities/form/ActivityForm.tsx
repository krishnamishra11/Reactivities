import React from 'react'
import { Segment,Form, Button } from 'semantic-ui-react'

const ActivityForm = () => {
    return (
    <Segment clearing>
         <Form>
             <Form.Input placeholder="Title" ></Form.Input>
             <Form.TextArea rows={2} placeholder="Description" ></Form.TextArea>
             <Form.Input placeholder="Category" ></Form.Input>
             <Form.Input type="Date" placeholder="Date" ></Form.Input>
             <Button content='Submit' type='submit' positive floated='right'  ></Button>
             <Button content='Cancel' type='submit'  floated='right'  ></Button>
         </Form>

    </Segment>
    )
}



export default ActivityForm
