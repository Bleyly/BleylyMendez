import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

import "./custom.css";
import { Empleados } from "./components/empleados/Empleados";
import { Departamentos } from "./components/departamentos/Departamentos";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/empleados" component={Empleados} />
        <Route exact path="/departamentos" component={Departamentos} />
      </Layout>
    );
  }
}
