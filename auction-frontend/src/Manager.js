import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';
import $ from 'jquery';
import Bidder from './Bidder';

class Manager extends Component {
    state = {
        image: null,
        name: '',
        description: '',
        price: 0,
        isBidding: false
    };

    async componentDidMount() {
        let isBidding = await auction.methods.isBidding().call();
        this.setState({isBidding: isBidding});
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
    handleSubmit = async (event) => {
        event.preventDefault();
        let form_data = new FormData();
        //thêm files vào trong form data
        form_data.append('file', this.state.image);
        form_data.append('name', this.state.name);
        form_data.append('price', this.state.price);
        form_data.append('description', this.state.description);
        //sử dụng ajax post
        let response;
        await $.ajax({
            url: "http://localhost/hpt/auction/doUpload", // gửi đến file upload.php
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: async function (res) {
                res = JSON.parse(res);
                response = res;
            }
        });
        if (response.status == '000') {
            const accounts = await web3.eth.getAccounts();
            await auction.methods.auction(this.state.price).send({
                from: accounts[0]
            });
            let isBidding = await auction.methods.isBidding().call();
            this.setState({isBidding: isBidding});
        } else {
            console.log('Save info failed');
        }
    };

    render() {
        if (this.state.isBidding) {
            // if (false) {
            return (
                <Bidder isManager={true}/>
            );
        } else {
            return (
                <div id="manager-page" className="main-content">
                    <h1 className="text-center">Manager Page</h1>
                    <form name="myForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div>
                                <span className="input-title">Ảnh minh họa:</span>
                                <input className="form-control" name="image" onChange={this.handleImageChange}
                                       type="file"
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
                                <textarea className="form-control" name="description"
                                          onChange={this.handleDescriptionChange}
                                          value={this.state.description} type="text" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div>
                                <span className="input-title">Giá khởi điểm (Ether):</span>
                                <input className="form-control" name="price" onChange={this.handlePriceChange}
                                       // value={this.state.price}
                                       type="text" required/>
                            </div>
                        </div>

                        <br/>
                        <div className="form-group text-right">
                            <button type="submit" className="btn btn-circle purple-color btn-custom">Xác nhận
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Manager;
