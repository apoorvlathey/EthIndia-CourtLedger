import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Layout from "./layout";
// import Login from "./Login";
import WrappedNormalLoginForm from "./Login";
import WrappedNormalAddCaseForm from "./AddCase";
import WrappedNormalRegisterLawyerForm from "./RegisterLawyer";
import WrappedNormalRegisterJudgeForm from "./RegisterJudge";
const Main = props => {
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={function() {
            return (
              <WrappedNormalLoginForm
                passableItems={props.passableItems}
                user={props.user}
              />
            );
          }}
        />
        <Route
          path="/home"
          render={function() {
            return <Layout passableItems={props.passableItems} />;
          }}
        />
        <Route
          path="/login"
          render={function() {
            return (
              <WrappedNormalLoginForm
                passableItems={props.passableItems}
                user={props.user}
              />
            );
          }}
        />
        <Route
          path="/addcase"
          render={function() {
            return (
              <WrappedNormalAddCaseForm passableItems={props.passableItems} />
            );
          }}
        />
        <Route
          path="/registerLawyer"
          render={function() {
            return (
              <WrappedNormalRegisterLawyerForm
                passableItems={props.passableItems}
              />
            );
          }}
        />
        <Route
          path="/registerJudge"
          render={function() {
            return (
              <WrappedNormalRegisterJudgeForm
                passableItems={props.passableItems}
              />
            );
          }}
        />
        <Route component={NoMatch} />
      </Switch>
    </main>
  );
};

export default Main;

const NoMatch = () => {
  return <div>Url Not Found</div>;
};
