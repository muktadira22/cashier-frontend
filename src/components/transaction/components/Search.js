import React, { Component } from 'react'
class Search extends Component {
    render(){
        return(
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
        )
    }
}

export default Search
