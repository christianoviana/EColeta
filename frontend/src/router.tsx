
import React from 'react';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';

import Home from './pages/home/index';
import Points from './pages/points/index';
import FindPoints from './pages/points/find';


const Routes = () => {
    return (
        <BrowserRouter>
        
            <Route path='/' exact render={() => <Redirect to='/home'/>}></Route>
            <Route component={Home} path='/home'></Route>
            <Route component={Points} path='/create-points' ></Route>           
            <Route component={FindPoints} path='/find-points' ></Route>           
        </BrowserRouter>
    );
}

export default Routes;