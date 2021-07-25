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
                <ThreeScene web3={this.state.web3} accounts={this.state.accounts}
                            contract={this.state.contract} balance={this.state.balance}/>
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
