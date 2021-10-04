import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class UpdateModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.updateItem}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.selectedChocolate.title} name='title' />
                          
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.selectedChocolate.imageUrl} name='imageUrl' />
                        </Form.Group>
                
                        <Button variant="primary" type="submit">
                            Update Item
                        </Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateModal;

