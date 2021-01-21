import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import i18n from "./locales/i18n.js";
import { withNamespaces } from "react-i18next";

// react-router-dom
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RecordAdd from "./components/record/RecordAdd";
import RecordView from "./components/record/RecordView";
import Category from "./components/category/CategoryManage";

class App extends Component {
  render() {
    const { t } = this.props;

    return (
      <BrowserRouter>
        <header>
          <Header />
        </header>

        <Switch>
          <Route path="/record/add" component={RecordAdd} />
          <Route path="/category/manage" component={Category} />
          <Route path="/record/view" component={RecordView} />
          <Redirect to="/record/add" component={RecordAdd} />
        </Switch>
        {/* //<ModalCenter /> */}

        {/* footer bar */}
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    );
  }
}

export default withNamespaces()(App);
