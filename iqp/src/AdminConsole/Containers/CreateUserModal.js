import React from 'react';
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export class CreateUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()
        }
        this.newUserForm = this.newUserForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
        this.props.handleNewUserTestDate(date);
      }

    newUserForm() {
        let testDateInput = (
            <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                    Test Date:  
                </Col>
                <Col sm={3}>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                </Col>
            </FormGroup>
        )
        return (
                <Form horizontal>
                <FormGroup controlId="formHorizontalUserId">
                    <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                        FirstName:
                    </Col>
                    <Col sm={3}>
                    <FormControl type="text" value={this.props.newUserFirstName} onChange={this.props.handleNewUserFirstNameChange}/>
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
            
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                        LastName: 
                    </Col>
                    <Col sm={3}>
                    <FormControl type="text" value={this.props.newUserLastName}  onChange={this.props.handleNewUserLastNameChange}/>
                    <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                        Role: 
                    </Col>
                    <Col sm={3}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.props.handleNewUserRoleChange}>
                            <option value="Candidate">Candidate</option>
                            <option value="Admin">Admin</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                {this.props.isAdmin === false ? testDateInput: <br/>}
                {/* <FormGroup>
                    <Col smOffset={4} sm={2}>
                    <Button type="submit" onClick={this.props.handleSubmit}>Submit</Button>
                    </Col>
                </FormGroup> */}
            </Form>
        )
    }

    render(){
        return (
            <div className="static-modal">
                <Modal  show={this.props.showModal}
                        bsSize="large"
                        aria-labelledby="contained-modal-title-lg">
                    <Modal.Header>
                    <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.newUserForm()}</Modal.Body>

                    <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.props.saveData}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}