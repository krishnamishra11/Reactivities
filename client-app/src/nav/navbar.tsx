import React, { useContext } from 'react'
import { Menu ,Container,Button} from 'semantic-ui-react'
import ActivityStore from '../app/store/activityStore'
import { observer } from 'mobx-react-lite'
import {  NavLink } from 'react-router-dom'




export const NavBar:React.FC  = () => {
  const activityStore=useContext(ActivityStore)
    return (
        <Menu fixed="top" inverted>
        <Container style={{margin:'10px'}} >
        <Menu.Item  header  as={NavLink}  to='/' >
          <img src="/assetes/logo.png" alt="logo" style={{marginRight:'10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink}  to='/activities'  >
          Reviews
        </Menu.Item>
        <Menu.Item name='freings'  as={NavLink}  to='/createActivity'>
          <Button onClick={()=> activityStore.clearActivity()} positive content="Create Activity" />
        </Menu.Item>
        </Container>
      </Menu>
    )
}

export default observer(NavBar)