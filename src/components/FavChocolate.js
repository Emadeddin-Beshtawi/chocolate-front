import React, { Component } from 'react';
import {Col,Card,Button} from 'react-bootstrap';


class FavChocolate extends Component {
    render() {
        return (
          
            <Col>
            <Card>
              <Card.Img variant="top" src={this.props.chocolate.imageUrl} />
              <Card.Body>
                <Card.Title>{this.props.chocolate.title}</Card.Title>
                <Button variant="primary" onClick={()=>this.props.updateChocolate(this.props.chocolate)}>Update</Button>
                <Button variant="danger" onClick={()=>this.props.deleteChocolate(this.props.chocolate._id)}>Delete</Button>

              </Card.Body>
            </Card>
          </Col>
        );
    }
}

export default FavChocolate;

