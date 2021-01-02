import { history } from './../../index';
import { IUser, IUserFormValues } from './../../model/User';
import { action, computed, observable, runInAction } from "mobx";
import agent from '../API/agent';
import { RootStore } from './rootStore';

export default class UserStore{
    rootStore:RootStore;
    constructor(rootStore:RootStore)
    {
      this.rootStore=rootStore;
    }
    
    @observable user:IUser| null=null;
    @computed get isLoggedIn() {return !!this.user}
    @action login =async (values:IUserFormValues)=>{
      try{
            const user =await agent.User.login(values);
            runInAction(()=>{
                this.user= user;
                
            })
            this.rootStore.commanStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
           console.log(user);
           history.push('/activities')
      }catch(error)
      {
          throw error;
      }
    }
    @action getUser=async()=>{
      try{
         const user=await agent.User.current();
         runInAction(
           ()=>
           {
             this.user=user;
           }
         )

      }catch(error){
        console.log(error);
      }
    }
    @action register=async (values:IUserFormValues)=>{
      try{
        const user =await agent.User.register(values);
        runInAction(()=>{
          this.user= user;
          
      })
        this.rootStore.commanStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();
        history.push('/activities');
      }catch(error){throw error;}
   
    }
    @action logout=()=>{
      this.rootStore.commanStore.setToken(null);
      this.user=null;
      history.push('/');
  }
}