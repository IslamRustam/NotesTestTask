import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";
import Authentication from "../../API/Authentication";
import NotesList from "../../components/NotesList";
import "./styles.css";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('current_user')) {
      history.push("/login");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    history.push("/login");
  };

  return (
    <div className="home__container">
      <Button onClick={handleLogout} className="home__logout__button">
        Logout
      </Button>
      <h1>{'Hello, ' + localStorage.getItem('current_user') + '!'}</h1>
        <div className="home__body">
          <NotesList />
        </div>
    </div>
  );
}

export default Home;