import React, { useContext } from 'react'
import { Menu ,Container,Button} from 'semantic-ui-react'
import ActivityStore from '../app/store/activityStore'
import { observer } from 'mobx-react-lite'



export const NavBar:React.FC  = () => {
  const activityStore=useContext(ActivityStore)
    return (
        <Menu fixed="top" inverted>
        <Container style={{margin:'10px'}} >
        <Menu.Item  header >
          <img src="/assetes/logo.png" alt="logo" style={{marginRight:'10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities'>
          Reviews
        </Menu.Item>
        <Menu.Item name='freings'>
          <Button onClick={()=> activityStore.openCreateForm()} positive content="Create Activity" />
        </Menu.Item>
        </Container>
      </Menu>
    )
}

export default observer(NavBar)