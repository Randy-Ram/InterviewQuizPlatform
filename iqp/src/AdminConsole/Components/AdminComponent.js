import React from 'react';
import { AdminLoginContainer } from '../Containers/AdminLoginContainer';
import { UserModal } from '../../UserForm/Components/UserModal';

export class AdminComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false
        }

        this.updateAuthenticationState = this.updateAuthenticationState.bind(this);
    }

    updateAuthenticationState(value) {
        this.setState({
            authenticated: value
        })
    }

    render(){
      
       return <AdminLoginContainer handleAuth={this.updateAuthenticationState} authState={this.state.authenticated}/>
   }
}