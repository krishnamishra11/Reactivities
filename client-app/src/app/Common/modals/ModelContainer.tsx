
import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../store/rootStore';
import { observer } from 'mobx-react-lite';

 const ModalContainer: React.FC=()=> {
     const rootStore=useContext(RootStoreContext);
     const {closeModal,modal:{open,body}} = rootStore.modalStore;
    
    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content >{body} </Modal.Content>
        </Modal>
    );
};


export default  observer(ModalContainer);