import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export class UserModal extends React.Component {

    render(){
        return(
            <div className="static-modal">
                <Modal show={this.props.showModal}>
                    <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.props.body}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onClickModal}>{this.props.buttonText}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
