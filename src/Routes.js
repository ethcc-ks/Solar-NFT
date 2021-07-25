import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ThreeScene from "./Pages/ThreeScene";
import Landing from "./Pages/Landing";
import Campagne from "./Pages/Campagne";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">                
                <Landing/>
            </Route>
            <Route path="/about">
                
                {/* <About/> */}

            </Route>
            <Route path="/play">
                <ThreeScene />
            </Route>
            <Route path="/campaign">
                <Campagne />
            </Route>
          
        </Switch>
    );
}

export default Routes;
