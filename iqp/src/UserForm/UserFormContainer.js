import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { UserModal } from './UserModal';

export class UserFormContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            firstName: '',
            surName: '',
            datetime: '',
            show: false,
            errorShow: false

        }

        this.getfirstNameValidationState = this.getfirstNameValidationState.bind(this);
        this.getSurnameValidationState = this.getSurnameValidationState.bind(this);
        this.getUserIDValidationState = this.getUserIDValidationState.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurNameChange = this.handleSurNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClickStartModal = this.onClickStartModal.bind(this)
        this.closeErrorModal = this.closeErrorModal.bind(this);
        this.checkFormValidity = this.checkFormValidity.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
    }

    checkFormValidity(){
        if(this.state.userId.length > 1 && this.state.firstName.length > 1 && this.state.surName.length)
        {
           return true;
        }
        return false;
    }

    onClickStartModal(){
        console.log("test")
        this.setState({
            show: false
        })
        this.props.onSubmit(true);  //start test
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

    getfirstNameValidationState(){
        const length = this.state.firstName.length
        if(length > 1){
            return 'success';
        }else {
            return 'error';
        }
    }

    getSurnameValidationState(){
        const length = this.state.surName.length
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

    handleFirstNameChange(e){
        this.setState({
            firstName: e.target.value
        })
    }

    handleSurNameChange(e){
        this.setState({
            surName: e.target.value
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
            <FormGroup controlId="formHorizontalEmail"  validationState={this.getUserIDValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                    UserID
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.state.userId} onChange={this.handleUserIdChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalFirstName"  validationState={this.getfirstNameValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                First Name
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.state.firstName}  onChange={this.handleFirstNameChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalSurname" validationState={this.getSurnameValidationState()} >
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                Surname
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.state.surName} onChange={this.handleSurNameChange}/>
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
        let userModal = <UserModal title="Test Instructions"
                                   body="This test focuses on accuracy on speed. You will have 65 minutes, click 'Start Test' when
                                   you are ready to begin."
                                   showModal={this.state.show}
                                   onClickModal={this.onClickStartModal}
                                   buttonText={"Start Test"}
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