import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import "./index.css";
import api from "../../Api";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo().then((userData) => {
      setCurrentUser(userData);
    });
  }, []);

  return (
    <>
      <Header user={currentUser}></Header>
      <main className="content container"></main>
      <Footer />
    </>
  );
};

export default App;
