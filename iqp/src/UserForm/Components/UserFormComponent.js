import React from 'react';
import { UserModal } from './UserModal';
import { startTestModalBody } from './StartTestModal';
import fetch from 'isomorphic-fetch';
import { LoginForm } from '../Containers/LoginFormContainer';

export class UserFormContainer extends React.Component {
    constructor(props){
        super(props);
        this.authState = false;
        this.state = {
            userId: '',
            password: '',
            firstName: '',
            surName: '',
            datetime: '',
            show: false,
            errorShow: false,

        }

        this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
        this.getUserIDValidationState = this.getUserIDValidationState.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClickStartModal = this.onClickStartModal.bind(this)
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.checkFormValidity = this.checkFormValidity.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
        this.verify_user = this.verify_user.bind(this);
    }

    verify_user(data){
        console.log(data);
        if(data.status === "failure"){
          this.authState = false;
        } else {
         this.authState = true;
        }
      }

      
    authenticateUser(){
        fetch('/api/authenticate', {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({username: this.state.userId, password: this.state.password})
        })
        .then(response => response.json())
        .then(data => this.verify_user(data))
        .catch(error => console.log)
    }

    checkFormValidity(){
        if(this.state.userId.length > 1 && this.state.password.length > 1)
        {
           return true;
        }
        return false;
    }

    onClickStartModal(){
        // fetch('/api/startTest', {
        //     credentials: 'same-origin',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify({action: "startTest"})
        //   })
        //   .then(response => response.json())
        //   .then(data => {
        //       console.log(data);
        //       if(data.status === "success"){
        //         this.setState({
        //             show: false
        //         })
        //         this.props.onSubmit(true);
        //       }
        //   })
        //   .catch(error => console.log)
                this.setState({
                    show: false
                })
                this.props.onSubmit(true);
    }

    showModal() {
        this.setState({
            show:true
        })
    }

    showErrorModal(){
        this.setState({
            errorShow: true,
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
        this.authenticateUser()
        console.log(this.authState)
        if(this.checkFormValidity() && this.authState){
            this.showModal();
        } else {
            this.showErrorModal();
        }
    }



    render(){
        let userModal = <UserModal title="Instructions"
                                   body={startTestModalBody}
                                   showModal={this.state.show}
                                   onClickModal={this.onClickStartModal}
                                   buttonText={"Start Test"}
                                   bsSize="large"
                                   />
        let errorModal = <UserModal title="Error" 
                                    body="Please ensure that all the relevant fields are properly filled in & your username/password is correct"
                                    showModal={this.state.errorShow}
                                    onClickModal={this.closeErrorModal}
                                    buttonText={"Ok"}
                        />
        let compToRender = this.state.show === true ? userModal : <LoginForm getUserIDValidationState={this.getUserIDValidationState} 
                                                                             getPasswordValidationState={this.getPasswordValidationState}
                                                                             handleSubmit={this.handleSubmit}
                                                                             password={this.state.password}
                                                                             userId={this.state.userId}
                                                                             handleUserIdChange={this.handleUserIdChange}
                                                                             handlePasswordChange={this.handlePasswordChange}
                                                                             usernameLabel="UserID"
                                                                             passwordLabel="Password"
                                                                 />; 
        let nextComp = this.state.errorShow === true ? errorModal : compToRender;
        return(
            nextComp    
        )
    }
}