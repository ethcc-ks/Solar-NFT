import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ThreeScene from "./Pages/ThreeScene";
import Landing from "./Pages/Landing";

function Routes() {
    function wrongPath() {
        return <h1>Wrong Url ...</h1>;
    }

    const reload = () => window.location.reload();

    return (
        <Switch>
            <Route path="/about">
                {/*
                                    <About/>
*/}
            </Route>
            <Route path="/play">
                <ThreeScene />
            </Route>
            <Route path="/">
                {/*
                                        <Landing/>
*/}
            </Route>
        </Switch>
    );
}

export default Routes;
