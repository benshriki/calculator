import React, { Component } from 'react';
//import { Route } from 'react-router';
import CalcArea from './components/CalcArea';
import CalcsHistory from './components/CalcsHistory';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;
    state = {
        calcsHistory: [],
        calcToUpdate: { x: undefined, y: undefined, op: undefined },
        lastRes: undefined,
        ops: [],
        loading: true
    }

    componentDidMount() {
        this.getOps();
    }

    addCalc = (calc) => {
        this.setState((prevState) => ({
            calcsHistory: prevState.calcsHistory.concat(calc),
            calcToUpdate: { x: null, y: null, op: null },
            lastRes: calc.result
        }));

    }

    deleteCalc = (del) => {
        console.log(del);
        this.setState((prevState) => ({ calcsHistory: prevState.calcsHistory.filter((obj)=> (obj!==del)) }))
    }

    updateCalc = (index) => {
        let c = this.state.calcsHistory[index];
        this.setState({
            calcToUpdate: this.state.calcsHistory[index],
            lastRes: undefined
        })
    }

    async getOps() {
        const response = await fetch('calc');
        const data = await response.json();
        console.log(data);
        this.setState({ ops: data, loading: false });
    }
    

    render() {
        return this.state.loading ? (<div>loading...</div>):(
           <div>
               <CalcArea
                   addCalc={this.addCalc}
                   calcToUpdate={this.state.calcToUpdate}
                   res={this.state.lastRes}
                   ops={this.state.ops}
               />
               <CalcsHistory
                   calcsHistory={this.state.calcsHistory}
                   deleteCalc={this.deleteCalc}
                   updateCalc={this.updateCalc}
               />
           </div>
    );
  }
}


