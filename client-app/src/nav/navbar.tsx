import React from 'react'
import { Menu ,Container,Button} from 'semantic-ui-react'

interface IProp{
  openCreateForm:(id:string)=>void;
  
}

export const NavBar:React.FC <IProp> = ({openCreateForm}) => {
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
          <Button onClick={()=> openCreateForm('')} positive content="Create Activity" />
        </Menu.Item>
        </Container>
      </Menu>
    )
}

export default NavBar