import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import ShoppingList from './components/ShoppingList'
import Login from './components/Login'
import Signup from './components/Signup'

const Router = () => (
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/ShoppingList' component={ShoppingList} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Signup' component={Signup} />
    </Switch>
)

export default Router

