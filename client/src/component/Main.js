import React from "react";
import { Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import Layout from "./layout";
// import Login from "./Login";
import WrappedNormalLoginForm from "./Login";
import WrappedNormalAddCaseForm from "./AddCase";
import WrappedNormalRegisterForm from "./Register";
const Main = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route path="/login" component={WrappedNormalLoginForm} />
                <Route path="/addcase" render={
                    function(){
                        return(
                            <WrappedNormalAddCaseForm passableItems={props.passableItems}/>
                        )
                    }
                }/>
                <Route path="/register" render={
                    function(){
                        return(
                            <WrappedNormalRegisterForm passableItems={props.passableItems}/>
                        )
                    }
                }/>
                <Route component={NoMatch} />
            </Switch>
        </main>
    );
}

export default Main;

const NoMatch = () => {
    return (
        <div>
            Url Not Found
        </div>
    )
}
