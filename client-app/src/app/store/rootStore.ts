import { configure } from 'mobx';
import { createContext } from 'react';
import ActivityStore from "./activityStore";
import CommanStore from './CommanStore';
import ModalStore from './modalStore';
import UserStore from "./UserStore";

configure({ enforceActions: "always" });
export class RootStore{
    activityStore: ActivityStore;
    userStore:UserStore;
    commanStore:CommanStore;
    modalStore:ModalStore;
 constructor()
 {
     this.activityStore=new ActivityStore(this);
     this.userStore=new UserStore(this);
     this.commanStore=new CommanStore(this);
     this.modalStore=new ModalStore(this);
 }

}

export const RootStoreContext=createContext(new RootStore());