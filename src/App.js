import react, { Component } from 'react';
import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }
    render(){
        return(
            <Router>
                <div className="App">
                    <Switch>    
                        <Route path="/" exact component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </Router>
        )
    }
}