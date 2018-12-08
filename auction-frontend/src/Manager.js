import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';

class Manager extends Component {
    state = {
        image: null,
        name: '',
        description: '',
        price: 0
    };

    async componentDidMount() {
        const isBidding = await auction.methods.isBidding().call();
        console.log(isBidding);
    }

    handleImageChange = (event) => {
        this.setState({image: event.target.files[0]});
    };
    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    };
    handlePriceChange = (event) => {
        if (!isNaN(parseFloat(event.target.value))) {
            this.setState({price: parseFloat(event.target.value)});
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        fetch('http://localhost/hpt', {
            body: JSON.stringify(this.state),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            // redirect: 'follow', // *manual, follow, error
            // referrer: 'no-referrer', // *client, no-referrer
        })
            .then(function (response) {
                console.log(response.json());
                return response.json(); // parses json
            })
            .then(function (myJson) {
                console.log(myJson);
            });
    };

    render() {
        return (
            <div>
                <div id="manager-page">
                    <h1 className="text-center">Manager</h1>
                    <form name="myForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div>
                                <span className="input-title">Ảnh minh họa:</span>
                                <input className="form-control" name="image" onChange={this.handleImageChange} type="file"
                                       accept="image/*" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div>
                                <span className="input-title">Tên sản phẩm:</span>
                                <input className="form-control" name="name" onChange={this.handleNameChange}
                                       value={this.state.name} type="text" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div>
                                <span className="input-title">Thông tin bổ sung:</span>
                                <textarea className="form-control" name="description" onChange={this.handleDescriptionChange}
                                       value={this.state.description} type="text" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div>
                                <span className="input-title">Giá khởi điểm (Ether):</span>
                                <input className="form-control" name="price" onChange={this.handlePriceChange}
                                       value={this.state.price} type="text" required/>
                            </div>
                        </div>

                        <br/>
                        <div className="form-group text-right">
                            <button type="submit" className="btn btn-circle purple-color btn-custom">Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );

    }
}

export default Manager;
