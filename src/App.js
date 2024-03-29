import React, { Component } from 'react';
import './App.css';
require('dotenv').config()

const apiendpoint = process.env.REACT_APP_API_END_POINT || " http://localhost:8080";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      currency: [],
      mynotes: [],
    }
    this.handleClick = this.handleClick.bind(this);
  }

  updateUser() {
    const url = apiendpoint + "/user";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ user: response });
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    // console.log("check this");
    // const url = apiendpoint+"/user";
    // fetch(url)
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ user: response });
    //   })
    //   .catch(error => console.log(error))

    // const url1 = apiendpoint+"/currency";
    // fetch(url1)
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json);
    //     this.setState({ currency: json });
    //   })
    //   .catch(error => console.log(error))

    this.updateUser();
  }

  handleClick() {
    console.log(this.nameTextInput);

    if (this.nameTextInput !== null && this.nameTextInput.value > 0) {
      console.log(this.nameTextInput.value);
      const url = apiendpoint + "/user/currency/withdraw/" + this.nameTextInput.value;
      fetch(url, {
        method: "POST"
        // body: JSON.stringify({userId: 1}),
        // mode: 'cors',
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   "Access-Control-Allow-Origin": "*"
        //   }
      })
        .then(response => response.json())
        .then(response => {
          this.setState({ mynotes: response });
        })
        .catch(error => console.log(error))
    }
  }

  render() {
    const { user, mynotes } = this.state;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Simple Withdrawal App</h1>
        </div>
        <div className="card" key="user">
          <div className="card-header">
            User information
          </div>
          <div className="card-body">
            <p className="card-text">Name:  {user.name}</p>
            <p className="card-text">Balance : {user.balance}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>

        <div className="card" key="atm">
          <div className="card-header">
            ATM - Enter an amount to withdraw
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Dkk</span>
              </div>
              <input type="number" ref={(ref) => this.nameTextInput = ref} className="form-control" aria-label="Amount (to the nearest dollar)" />
              <button type="button" className="btn btn-dark" onClick={this.handleClick}>Withdraw</button>

            </div>
          </div>
        </div>
        <div className="card" key="amoutshow">
          <div className="card-header">
          Amount is withdrawn in following currency types
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
                <ul className="list-group">

                  <li className="list-group-item">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Currency type</th>
                          <th scope="col">Value</th>
                          <th scope="col">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mynotes.map((note) => (
                          <tr>
                            <th scope="row">-</th>
                            <td>{note.type}</td>
                            <td>{note.value}</td>
                            <td>{note.count}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </li>
                  {this.updateUser()}
                </ul>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

