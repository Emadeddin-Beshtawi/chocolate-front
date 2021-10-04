import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Row } from 'react-bootstrap';
import Chocolate from './Chocolate';
import axios from 'axios';


class AllDataAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allChocolates: []
        }
    }

    async componentDidMount() {

        await axios.get(`https://chocolate-emadeddin.herokuapp.com/getDataFromAPI`).then(results => {
            this.setState({
                allChocolates: results.data
            })
        })

    }

    addToFav = async (chocolate) => {
        chocolate.email = this.props.auth0.user.email;
        await axios.post(`https://chocolate-emadeddin.herokuapp.com/createChocolate`, chocolate);
    }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {this.state.allChocolates.length !== 0 && this.state.allChocolates.map((chocolate, idx) => <Chocolate key={idx} chocolate={chocolate} addToFav={this.addToFav} />)}
                </Row>
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);



