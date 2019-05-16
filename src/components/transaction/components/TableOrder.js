import React, { Component } from 'react'
class TableOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            order: []
        }
    }

    componentWillReceiveProps(){
        this.setState({
            order: this.props.data
        })
    }

    handleDecrease(e, id, index){
        e.preventDefault();
        if(this.state.order.length !== 0){
            let item = Object.assign([], this.state.order);
            item[index].qty -= 1;
            if(item[index].qty === 0)
                item.splice(index, 1);

            this.setState({
                order: item
            });
            this.props.action(id)
        }
    }

    render(){

        const { order } = this.state
        return(
            <div className="card">
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
                        { order.map((d, index) =>
                            <tr key={index}>
                                <th scope="row">{d.id}</th>
                                <td>{d.nama}</td>
                                <td>{d.qty}/porsi</td>
                                <td>Rp. {d.harga}</td>
                                <td>Rp. {d.harga * d.qty}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-warning" onClick={(e) => this.handleDecrease(e, d.id, index)}>-</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )}

                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableOrder
