import React, { Component } from 'react'
import DetailMenu from './DetailMenu'
import Masakan from '../masakan.json'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            menus: [],
            orders: [],
        }

        this.handleMenuClick = this.handleMenuClick.bind(this)
    }

    componentDidMount(){
        let masakan = {Masakan}.Masakan;
        this.setState({
            menus: masakan
        })
    }

    handleMenuClick(data){
        let orders = Object.assign([], this.state.orders);
        let menus = Object.assign([], this.state.menus);
        let type = ['makanan', 'minuman', 'other'];

        let find = false;
        if(orders.length !== 0){
            for(let i =  0; i < orders.length; i++){
                if(orders[i].id === data.id){
                    find = true;
                    orders[i].qty += 1;
                }
            }

            if(!find){
                orders.push(data)
            }
        }
        else {
            orders.push(data)
        }
        for(let j = 0; j < type.length; j++){
            let t = type[j];
            for(let i = 0; i < menus[t].length; i++){
                if(menus[t][i].id === data.id){
                    menus[t][i].stock -= 1
                }
            }
        }
        this.setState({orders, menus})
    }

    handleDecrease(e, id, key){
        e.preventDefault();
        let menus = Object.assign([], this.state.menus);
        let orders = Object.assign([], this.state.orders)
        let type = ['makanan', 'minuman', 'other'];
        for(let j = 0; j < type.length; j++){
            let t = type[j];
            for(let i = 0; i < menus[t].length; i++){
                if(menus[t][i].id === id){
                    menus[t][i].stock += 1;
                    orders[key].qty -= 1;
                    if(orders[key].qty === 0)
                        orders.splice(key, 1);
                }
            }
        }
        this.setState({menus, orders})
    }

    totalBayar(){
        const { orders } = this.state
        var total = 0;
        for(let i = 0; i < orders.length; i++){
            total += ( orders[i].qty * orders[i].harga )
        }

        return total
    }

    handleModal(e, key){
        e.preventDefault();
        document.getElementById("modal-conf").modal("show");
        this.props.index(key);
    }

    handleDelete(e, key){
        e.preventDefault();
        let menus = Object.assign([], this.state.menus);
        let orders = Object.assign([], this.state.orders)
        let type = ['makanan', 'minuman', 'other'];
        let qty = orders[key].qty;
        let id = orders[key].id;
        for(let j = 0; j < type.length; j++){
            let t = type[j];
            for(let i = 0; i < menus[t].length; i++){
                if(menus[t][i].id === id){
                    menus[t][i].stock += qty;
                    orders.splice(key, 1);
                }
            }
        }
        console.log(this.props.index);
        this.setState({ orders, menus })
    }

    render(){
        const { orders, menus } = this.state
        return(
            <React.Fragment>
               <div className="row" style={{marginTop: 1 + '%'}}>
                    <div className="col-lg-7">
                        <div className="card">
                            <div className="card-body">
                                <h1>Menu</h1>
                                <div id="accordion">
                                    <div className="card bg-primary mb-3">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Makanan
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body row">
                                                <DetailMenu items={menus.makanan} menu={this.handleMenuClick}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card bg-success mb-3">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button className="btn" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Minuman
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div className="card-body row">
                                                {/* <DetailMenu items={menus.minuman}/> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card bg-dark mb-3">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <button className="btn" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Lain - Lain
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div className="card-body row">
                                                {/* <DetailMenu items={menus.other}/> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" placeholder="Input Struck" />
                                        </div>
                                        <button className="btn btn-primary col-sm-auto">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                            <h3>List Pesanan</h3>
                            <table className="table table-striped table-bordered table-sm table-responsive-sm">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Menu</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Subtotal</th>
                                    <th scope="col">Act</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { orders.map((d, index) =>
                                        <tr key={index}>
                                            <th scope="row">{d.id}</th>
                                            <td>{d.nama}</td>
                                            <td>{d.qty}/porsi</td>
                                            <td>Rp. {d.harga}</td>
                                            <td>Rp. {d.harga * d.qty}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-warning" onClick={(e) => this.handleDecrease(e, d.id, index)}>-</button>
                                                    <button type="button" className="btn btn-danger" onClick={(e) => this.handleDelete(e, index)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body text-right">
                                <h3>RP { this.totalBayar()}.-</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal For Delete */}
                <div className="modal" tabIndex="-1" role="dialog" id="modal-conf">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}>Save changes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default App
