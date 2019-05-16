import React, { Component } from 'react';
import Transaction from './components/transactionV2/App';

class App extends Component {
    render(){
        return (
            <div className="conteiner-fluid">
                <Transaction />
            </div>
        )
    }
}

export default App;
