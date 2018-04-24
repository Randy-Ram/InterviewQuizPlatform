import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { UserModal } from './UserModal';
import { startTestModalBody } from './StartTestModal';
import fetch from 'isomorphic-fetch';

export class UserFormContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            password: '',
            firstName: '',
            surName: '',
            datetime: '',
            show: false,
            errorShow: false

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
    }

    checkFormValidity(){
        if(this.state.userId.length > 1 && this.state.password.length > 1)
        {
           return true;
        }
        return false;
    }

    onClickStartModal(){
        fetch('/api/startTest', {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({action: "startTest"})
          })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              if(data.status === "success"){
                this.setState({
                    show: false
                })
                this.props.onSubmit(true);
              }
          })
          .catch(error => console.log)
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
        // this.showModal();
        if(this.checkFormValidity()){
            this.showModal();
        } else {
            this.showErrorModal();
        }
    }



    render(){
        let userForm = (
            <Form horizontal>
            <FormGroup controlId="formHorizontalUserId"  validationState={this.getUserIDValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                    UserID
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.state.userId} onChange={this.handleUserIdChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword"  validationState={this.getPasswordValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Password
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.state.password}  onChange={this.handlePasswordChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>

            <FormGroup>
                <Col smOffset={4} sm={2}>
                <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
        )
        let userModal = <UserModal title="Instructions"
                                   body={startTestModalBody}
                                   showModal={this.state.show}
                                   onClickModal={this.onClickStartModal}
                                   buttonText={"Start Test"}
                                   bsSize="large"
                                   />
        let errorModal = <UserModal title="Error" 
                                    body="Please ensure that all the relevant fields are properly filled in."
                                    showModal={this.state.errorShow}
                                    onClickModal={this.closeErrorModal}
                                    buttonText={"Ok"}
                        />
        let compToRender = this.state.show === true ? userModal : userForm; 
        let nextComp = this.state.errorShow === true ? errorModal : compToRender;
        return(
            nextComp    
        )
    }
}