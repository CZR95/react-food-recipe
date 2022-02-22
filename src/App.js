import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import i18n from "./locales/i18n.js";
import { withNamespaces } from "react-i18next";

// react-router-dom
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Recipe from "./components/recipe/Recipe";

class App extends Component {
  render() {
    // const { t } = this.props;

    return (
      <BrowserRouter>
        <header>
          <Header />
        </header>

        <Switch>
          <Route path="/recipe" component={Recipe} />

          <Redirect to="/recipe" component={Recipe} />
        </Switch>

        {/* footer bar */}
        <footer>{/* <Footer /> */}</footer>
      </BrowserRouter>
    );
  }
}

export default withNamespaces()(App);
