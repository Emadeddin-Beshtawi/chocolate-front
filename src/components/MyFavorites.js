import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "././MyFavorites.js";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { Row } from "react-bootstrap";
import FavChocolate from "./FavChocolate";
import UpdateModal from "./UpdateModal.js";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favChocolates: [],
      show: false,
      selectedChocolate: {},
    };
  }

  componentDidMount = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER}/getChocolate?email=${this.props.auth0.user.email}`
      )
      .then((results) => {
        this.setState({
          favChocolates: results.data,
        });
      });
  };

  updateChocolate = (item) => {
    this.setState({
      selectedChocolate: item,
      show: true,
    });
  };

  deleteChocolate = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER}/deleteChocolate/${id}`);
    const items = this.state.favChocolates.filter((obj) => obj._id !== id);
    this.setState({
      favChocolates: items,
    });
  };

  ////////////////// UP ////////////////////

  updateItem = async (e) => {
    const id = this.state.selectedChocolate._id;
    const body = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
    };
    const req = await axios.put(
      `${process.env.REACT_APP_SERVER}/updatedChocolate/${id}`,
      body
    );
    const newItem = this.state.favChocolates.map((obj) => {
      if (obj._id === id) {
        obj.title = req.data.title;
        obj.imageUrl = req.data.imageUrl;

        return obj;
      }
      return obj;
    });
    this.setState({ favChocolates: newItem });
    this.updateChocolate({});
    this.setState({ show: false });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>This is a collection of my favorites</p>
        <UpdateModal
          show={this.state.show}
          updateItem={this.updateItem}
          handleClose={this.handleClose}
          selectedChocolate={this.state.selectedChocolate}
        />

        {this.state.favChocolates.length !== 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {this.state.favChocolates.length !== 0 &&
              this.state.favChocolates.map((chocolate, idx) => (
                <FavChocolate
                  key={idx}
                  chocolate={chocolate}
                  deleteChocolate={this.deleteChocolate}
                  updateChocolate={this.updateChocolate}
                />
              ))}
          </Row>
        ) : (
          <h2
            style={{
              background: "yellow",
              color: "black",
              textAlign: "center",
            }}
          >
            Your List is Empty -\_(``)_/-
          </h2>
        )}
      </>
    );
  }
}

export default withAuth0(MyFavorites);
