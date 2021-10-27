import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { UpdateData } from "../pages/Update";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={UpdateData} exact path="/update/:id" />
      </Switch>
    </BrowserRouter>
  );
};
