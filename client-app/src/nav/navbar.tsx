import React, { useContext } from 'react'
import { Menu ,Container,Button, Dropdown, Image} from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import {  Link, NavLink } from 'react-router-dom'
import { RootStoreContext } from '../app/store/rootStore'




export const NavBar:React.FC  = () => {
  const rootstore=  useContext(RootStoreContext).userStore;
  const {logout,user}=rootstore; 
  const activityStore=useContext(RootStoreContext).activityStore;
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
        { user && 
                  <Menu.Item position='right'>
                    <Image avatar spaced='right' src={ user.image || '/assets/user.png'} />
                    <Dropdown pointing='top left' text={user.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                        <Dropdown.Item  onClick={logout} text='Logout' icon='power' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
        }
        </Container>
      </Menu>
    )
}

export default observer(NavBar)