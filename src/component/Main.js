import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Layout from "./layout";
// import Login from "./Login";
import WrappedNormalLoginForm from "./Login";
import WrappedNormalAddCaseForm from "./AddCase";
import WrappedNormalRegisterForm from "./Register";
export default function Main() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route path="/login" component={WrappedNormalLoginForm} />
                <Route path="/addcase" component={WrappedNormalAddCaseForm} />
                <Route path="/register" component={WrappedNormalRegisterForm} />
                <Route component={NoMatch} />
            </Switch>
        </main>
    );
}



const NoMatch = () => {
    return (
        <div>
            Url Not Found
        </div>
    )
}
