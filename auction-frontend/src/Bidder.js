import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';

class Bidder extends Component {
    state = {
        isManager: this.props.isManager ? this.props.isManager : false,
        product: {
            image: 'https://www.dictionary.com/e/wp-content/uploads/2018/04/Sid-the-Sloth.jpg',
            name: "",
            description: "",
            price: 0,
            currentBid: 0
        }

    };

    async componentDidMount() {
        const seller = await auction.methods.manager().call();
        const latestBid = await auction.methods.latestBid().call();
        const latestBidder = await auction.methods.latestBidder().call();
        const price = await auction.methods.initBid().call();
        const balance = await web3.eth.getBalance(auction.options.address);
        // fetch data

        this.setState({
            product: {
                image: 'https://www.dictionary.com/e/wp-content/uploads/2018/04/Sid-the-Sloth.jpg',
                name: "Computer",
                description: "Rat dep",
                price,
                currentBid: latestBid
            },
        })
    }

    handleBidChange = (event) => {
        event.preventDefault();
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
                            <td>{web3.utils.fromWei(this.state.product.currentBid.toString(), 'ether')} ether</td>
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
                        <div className="form-inline">
                            <div className="form-group" style={{"marginRight": "30px"}}>
                                <div className="input-group">
                                    <div className="input-group-addon">$</div>
                                    <input className="form-control" name="bid" onChange={this.handleBidChange}
                                           value={this.state.bid}
                                           type="text" required/>
                                    <div className="input-group-addon">ether</div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Đấu giá</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Bidder;
