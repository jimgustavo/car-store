import React from "react";
import Axios from "axios";
import Avatar from "./Avatar";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.className]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    Axios.post("/api/users/login", {
      email,
      password
    })
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        } else {
          this.props.history.replace("/ShoppingList");
          console.log(res);
          console.log(res.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
	<Avatar />
	<div className="submitForm">
        <form onSubmit={this.handleSubmit}>
          <br />
          <input
            className="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            className="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={this.handleChange}
          />
          <br />
          <br /> 
          <button className="buttonLogin">Ingresar</button>
        </form>
	<br />
	<a
         className= "signupLink"
	 href= "/Signup"
	>
	Si aún no tienes cuenta, creala aqui
	</ a>
	</div>
      </div>
    );
  }
}

