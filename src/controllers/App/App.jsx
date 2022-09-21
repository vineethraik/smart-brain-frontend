/**
 * route-> 
 *      home
 *      signout
 *      signin
 *      register
 *      leaderboard
 */


import React, { Component } from "react";
import './App.css'

const initialState = {
    route: 'signin',
}

export default class App extends Component {
    constructor(params) {
        super(params);
        this.state = initialState;
    }

    


    render() {
        return (
            <div className="app main">
                
            </div>
        )
    }
}