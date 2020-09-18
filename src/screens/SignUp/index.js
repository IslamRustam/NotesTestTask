import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Authentication from "../../API/Authentication";
import "./styles.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isFormValid = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Authentication.mockSignup(email, password);
    history.push("/login");
  }

  const handleLogin = () => {
    history.push("/login");
  }

  return (
    <div className="signup__container">
      <h1 className="signup__header">Create an account</h1>
      <form className="signup__form" onSubmit={handleSubmit}>
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
          Sign Up
        </Button>
      </form>
      <div className="signup__footer">
        <h4 className="signup__footer__text">
          Already have an account?
        </h4>
        <Button onClick={handleLogin} className="signup__footer__button">
          Login
        </Button>
      </div>
    </div>
  );
}

export default SignUp;