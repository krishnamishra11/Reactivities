import React from 'react'
import { List ,Image,Popup} from 'semantic-ui-react'
import { IAttendee } from '../../model/IActivity'

interface IProps{
  attendees:IAttendee[]
}

export const ActivityListItemAttendees:React.FC<IProps> = ({attendees}) => {
    return (<List horizontal>
            {
        
              attendees.map(attendee=> (
                      <List.Item key={attendee.username}>
                                    <Popup header={attendee.username}
                       trigger={<Image size='mini' circular src={attendee.image || '/assetes/user.png'}></Image>}
                        />
                      </List.Item>
              ))
            }
          </List>
    )
}
