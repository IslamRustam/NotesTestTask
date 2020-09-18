import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Authentication from "../../API/Authentication";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const isFormValid = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userPassword = localStorage.getItem(email);

    if (userPassword === password) {
      Authentication.mockLogin(email);
      history.push("/home");
    } else {
      setError(true);
    }
  }

  const handleSignUp = () => {
    history.push("/signup");
  }

  return (
    <div className="login__container">
      <h1 className="login__header">Welcome!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <h5>Email</h5>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <h5>Password</h5>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button className="form__button" disabled={!isFormValid()} type="submit">
          Login
        </Button>
      </form>
      {error &&
        <h6 className='error'>Invalid credentials</h6>
      }
      <div className="login__footer">
        <h4 className="login__footer__text">
          Don't have an account?
        </h4>
        <Button onClick={handleSignUp} className="login__footer__button">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Login;