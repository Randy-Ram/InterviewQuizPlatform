import React from 'react';
import { LoginForm } from '../../UserForm/Containers/LoginFormContainer';
import { UserModal } from '../../UserForm/Components/UserModal';

export class AdminLoginContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            password: '',
            errorShow: false,
            errorTitle: '',
            errorBody: '',
            errorButtonText: ''
        }

        this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
        this.getUserIDValidationState = this.getUserIDValidationState.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.checkFormValidity = this.checkFormValidity.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
        this.renderErrorModal = this.renderErrorModal.bind(this);
    }

    checkFormValidity(){
        if(this.state.userId.length > 1 && this.state.password.length > 1)
        {
           return true;
        }
        return false;
    }


    authenticateUser(){
        console.log(this.state.userId)  
        if (this.state.userId === 'rram'){  //Authenticate user on backend here
            this.props.handleAuth(true);
        } else {
            console.log("Failed Auth")
            this.props.handleAuth(false);
            this.showErrorModal("Authentication Error", "Please enter a valid username/password", "OK");
        }
    }

    showErrorModal(title, body, buttonText){
        this.setState({
            errorShow: true,
            errorTitle: title,
            errorBody: body,
            errorButtonText: buttonText
        })
    }

    closeErrorModal(){
        this.setState({
            errorShow: false
        })
    }

    getUserIDValidationState(){
        const length = this.state.userId.length
        if(length > 1){
            return 'success';
        }else {
            return 'error';
        }
    }

    getPasswordValidationState(){
        const length = this.state.password.length
        if(length > 1){
            return 'success';
        }else {
            return 'error';
        }
    }

    handleUserIdChange(e){
        this.setState({
            userId: e.target.value
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e){
        //console.log("Clicked")
        e.preventDefault();
        // this.showModal();
        if(this.checkFormValidity()){
            this.authenticateUser();
        } else {
            this.showErrorModal("Error", "Please fill out all relevant fields", "OK");
        }
    }

    renderErrorModal() {
        return (
            <UserModal title={this.state.errorTitle} 
                       body={this.state.errorBody}
                       showModal={this.state.errorShow}
                       onClickModal={this.closeErrorModal}
                       buttonText={this.state.errorButtonText}
                    />
        )
    }

    render(){
            let adminPortal = <h1>Admin Portal </h1>
            let compToRender = this.props.authState === true ? adminPortal : <LoginForm     getUserIDValidationState={this.getUserIDValidationState} 
                                                                                            getPasswordValidationState={this.getPasswordValidationState}
                                                                                            handleSubmit={this.handleSubmit}
                                                                                            password={this.state.password}
                                                                                            userId={this.state.userId}
                                                                                            handleUserIdChange={this.handleUserIdChange}
                                                                                            handlePasswordChange={this.handlePasswordChange}
                                                                                            usernameLabel="Admin Username"
                                                                                            passwordLabel="Admin Password"
                                                                                    />; 
            let nextComp = this.state.errorShow === true ? this.renderErrorModal() : compToRender;
            return(
                nextComp    
            )
    }
}