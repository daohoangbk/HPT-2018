import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';
import $ from 'jquery';

class Bidder extends Component {
    state = {
        isManager: this.props.isManager ? this.props.isManager : false,
        product: {
            image: 'https://www.dictionary.com/e/wp-content/uploads/2018/04/Sid-the-Sloth.jpg',
            name: "",
            description: "",
            price: 0,
        },
        currentBid: 0,
        latestBidder: '',
        bidValue: 0
    };

    async componentDidMount() {
        const seller = await auction.methods.manager().call();
        const latestBid = await auction.methods.latestBid().call();
        const latestBidder = await auction.methods.latestBidder().call();
        const price = await auction.methods.initBid().call();
        const balance = await web3.eth.getBalance(auction.options.address);
        let response;
        await $.ajax({
            url: "http://localhost/hpt/auction/get_lastest_record", // gửi đến file upload.php
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            type: 'get',
            success: async function (res) {
                res = JSON.parse(res);
                response = res;
            }
        });
        let data = response.data;
        console.log(response);
        // fetch data

        this.setState({
            product: {
                image: data.image,
                name: data.name,
                description: data.description,
                price,
            },
            currentBid: latestBid,
            latestBidder,
        })
    }

    handleBidChange = (event) => {
        event.preventDefault();
        this.setState({
            bidValue: parseFloat(event.target.value)
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        const weiAmount = web3.utils.toWei(parseFloat(this.state.bidValue).toString(), 'ether');
        let test = await auction.methods.bid().send({
            from: accounts[0],
            value: weiAmount
        });
        console.log(test);
        // this.setState({
        //     latestBid: weiAmount,
        //     balance: weiAmount,
        //     latestBidder: accounts[0]
        // });
    };

    render() {
        return (
            <div className="main-content text-center">
                <h1 className="text-center">Bidder Page</h1>
                <div>
                    <img src={this.state.product.image} alt="Anh minh hoa" className="img-responsive"/>
                </div>
                <table className="table text-left">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tên sản phẩm:</td>
                            <td>{this.state.product.name}</td>
                        </tr>
                        <tr>
                            <td>Thông tin chi tiết:</td>
                            <td>{this.state.product.description}</td>
                        </tr>
                        <tr>
                            <td>Giá khởi điểm:</td>
                            <td>{web3.utils.fromWei(this.state.product.price.toString(), 'ether')} ether</td>
                        </tr>
                        <tr>
                            <td>Giá hiện tại:</td>
                            <td>{web3.utils.fromWei(this.state.currentBid.toString(), 'ether')} ether</td>
                        </tr>
                        <tr>
                            <td>Người giữ giá cao nhất hiện tại:</td>
                            <td>{this.state.latestBidder}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="form-group text-left">
                    <div>
                        <span className="input-title">Số tiền đấu giá:</span>
                        <form className="form-inline" onSubmit={this.handleBidSubmit}>
                            <div className="form-group" style={{"marginRight": "30px"}}>
                                <div className="input-group">
                                    <div className="input-group-addon">$</div>
                                    <input className="form-control" name="bid" onChange={this.handleBidChange}
                                           value={this.state.bidValue}
                                           type="text" required/>
                                    <div className="input-group-addon">ether</div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Đấu giá</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bidder;
