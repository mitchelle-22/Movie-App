//routing the pages
import React from "react";
import Sign_up from "./pages/sign-up";
import Login from "./pages/login";
import Pwd_Reset from "./pages/password-reset";

//routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//header
import Header from "./components/header";
//home
import Home from "./components/Home";

//styles
import { GlobalStyle } from "./GlobalStyle";
import NavBar from "./components/navBar/NavBar";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import Dashboard from './pages/dashboard';

const App = () => (
  <>
    <Router>
      <NavBar />
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<Pwd_Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </Router>
  </>
);

export default App;
