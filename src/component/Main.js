import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Layout from "./layout";
// import Login from "./Login";
import WrappedNormalLoginForm from "./Login";
export default function Main() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route path="/login" component={WrappedNormalLoginForm} />
            </Switch>
        </main>
    );
}
