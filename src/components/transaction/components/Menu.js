import React, { Component } from 'react'
import DetailMenu from './DetailMenu'
class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            makanan: [],
            minuman: [],
            other: [],
        }

        this.handleDetailOrder = this.handleDetailOrder.bind(this)
    }

    componentDidMount(){
        this.setState((state, props) => ({
            makanan: props.menus.makanan,
            minuman: props.menus.minuman,
            other: props.menus.other
        }))
    }

    handleDetailOrder(data){
        this.props.action(data);
    }

    render(){
        console.log(this.props.idDecrease)
        const { makanan, minuman, other } = this.state
        return(
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
                                        <DetailMenu action={this.handleDetailOrder} data={makanan} />
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
                                    <DetailMenu action={this.handleDetailOrder} data={minuman} />
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
                                    <DetailMenu action={this.handleDetailOrder} data={other} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu
