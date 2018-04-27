import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export class LoginForm extends React.Component {
    render(){
        return(
            <Form horizontal style={{"paddingLeft": "95px"}}>
            <FormGroup controlId="formHorizontalUserId"  validationState={this.props.getUserIDValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                    {this.props.usernameLabel}
                </Col>
                <Col sm={3}>
                <FormControl type="text" value={this.props.userId} onChange={this.props.handleUserIdChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>
        
            <FormGroup controlId="formHorizontalPassword"  validationState={this.props.getPasswordValidationState()}>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                {this.props.passwordLabel}
                </Col>
                <Col sm={3}>
                <FormControl type="password" value={this.props.password}  onChange={this.props.handlePasswordChange}/>
                <FormControl.Feedback />
                </Col>
            </FormGroup>
        
            <FormGroup>
                <Col smOffset={4} sm={2}>
                <Button type="submit" onClick={this.props.handleSubmit}>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
        )
    }
}