import React, { Component } from 'react'

class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: []
        }
    }

    componentDidMount(){
        this.setState((state, props) => ({
            item: props.items
        }))
    }

    handleClickOrder(e, data){
        e.preventDefault();

        // let item = Object.assign({}, this.state.item);
        // item[index].stock-= stockCount;
        // this.setState(item);

        let menu = {
            "id" : data.id,
            "nama"  : data.nama,
            "qty"   : 1,
            "harga" : data.harga
        }

        this.props.menu(menu);
    }

    render(){
        const { item } = this.state
        return(
            <React.Fragment>
                { item.map((i, index) =>
                    <div className="col-md-3 mb-3" key={index}>
                        <div className="card">
                            <img src={process.env.PUBLIC_URL + "/assets/img/fb.png"} style={{ width: 100 + "%" }} className="card-img-top" alt="img cap"/>
                            <div className="card-body pb-2 pt-1 pr-2 pl-2">
                                <h5 className="card-title mb-0 mt-0 mr-0 ml-0">{i.nama}</h5>
                                <p className="card-text mb-0 mt-0 mr-0 ml-0">Rp. {i.harga} </p>
                                <p className="card-text mb-0 mt-0 mr-0 ml-0">Stock : {i.stock} </p>
                                <button type="button" className="btn btn-warning btn-block mt-1" onClick={(e) => {this.handleClickOrder(e, i)}}>Order</button>
                            </div>
                        </div>
                    </div>
                 )
                }

            </React.Fragment>
        )
    }
}

export default Detail
