import React from 'react';
import { Modal, Button, } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export class DeleteUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment()
        }
    }

    render(){
        return (
            <div className="static-modal">
                <Modal  show={this.props.showDeleteModal}
                        bsSize="small"
                        aria-labelledby="contained-modal-title-lg">
                    <Modal.Header>
                    <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure you would like to delete user: <b>{this.props.username}?</b></Modal.Body>

                    <Modal.Footer>
                    <Button onClick={this.props.closeDeleteModal}>Close</Button>
                    <Button bsStyle="danger" onClick={() => this.props.handleDeleteUser(this.props.rowClicked,this.props.fetchData, this.props.tableState, this.props.tableInstance)}>Delete User</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}