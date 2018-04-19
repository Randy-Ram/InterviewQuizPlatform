import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export class UserFormContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userId: '',
            firstName: '',
            surName: '',
            datetime: ''

        }

        this.getfirstNameValidationState = this.getfirstNameValidationState.bind(this);
        this.getSurnameValidationState = this.getSurnameValidationState.bind(this);
        this.getUserIDValidationState = this.getUserIDValidationState.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurNameChange = this.handleSurNameChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        e.preventDefault();
        console.log(this.state);
        this.props.onSubmit(true);
    }

    render(){
        return(
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
    }
}