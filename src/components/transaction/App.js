import React, { Component } from 'react'
import Menu from './components/Menu'
import SearchStruct from './components/Search'
import TableOrder from './components/TableOrder'
import Masakan from '../masakan.json'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            masakan: [],
            order: []
        }

        this.handleMenu = this.handleMenu.bind(this)
    }

    componentDidMount(){
        let msk = {Masakan}.Masakan
        this.setState({
            masakan: msk
        })
    }

    handleMenu(data){
        let order = data;
        let count = this.state.order.length;
        let item = this.state.order;
        if(count !== 0){
            let ketemu = false;
            for(let i = 0; i < count; i++){
                if(item[i].id === data.id){
                    ketemu = true;
                    item[i].qty += data.qty;
                }
            }

            if(!ketemu)
                item.push(order)

            this.setState({
                order : item
            });
        } else {
            item.push(order);
            this.setState({
                order : item
            });
        }
    }

    handleDecrease(data){
        return data;
    }

    render(){
        const { masakan, order } = this.state
        return(
            <React.Fragment>
               <div className="row" style={{marginTop: 1 + '%'}}>
                    <div className="col-lg-7">
                        <Menu action={this.handleMenu} menus={masakan} idDecrease={this.handleDecrease}/>
                    </div>
                    <div className="col-md-5">
                        <SearchStruct />
                        <TableOrder data={order} action={this.handleDecrease}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App
