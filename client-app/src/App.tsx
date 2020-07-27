import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, Image,List } from 'semantic-ui-react';

class App extends Component {
  state={
    values:[]
  }

  componentDidMount(){

    axios.get ('http://localhost:5000/Value').then(
      (responce)=>{
        console.log(responce);
        this.setState({
          values:responce.data
        })
      }
    )
    
  }
  render() {
    return(
    <div >
       <Header as='h2' >
      <Icon name='users' />
      <Header.Content>Friends</Header.Content>
      
      <List>
          { this.state.values.map( (val:any)=>
          ( 
            <List.Item  icon='marker' content={val.name} />
          )
        )}
      </List>
    </Header>
    </div>);
  }
}

export default App;
