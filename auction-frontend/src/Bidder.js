import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';

class Bidder extends Component {
    state = {
        isManager: this.props.isManager ? this.props.isManager : false,
        product: {}

    };

    async componentDidMount() {
        console.log(this.state.isManager);
        const seller = await auction.methods.manager().call();
        const latestBid = await auction.methods.latestBid().call();
        const latestBidder = await auction.methods.latestBidder().call();
        const balance = await web3.eth.getBalance(auction.options.address);
        // fetch data
        this.setState({
            product: {
                image: 'https://www.dictionary.com/e/wp-content/uploads/2018/04/Sid-the-Sloth.jpg',
                name: "Computer",
                description: "Rat dep",
                price: 5,
                currentBid: 5
            }
        })
    }

    render() {
        return (
            <div class="main-content text-center">
                <h1 class="text-center">Bidder</h1>
                <div>
                    <img src={this.state.product.image} alt="Anh minh hoa" class="img-responsive"/>
                </div>
                <h2>
                    Tên sản phẩm: {this.state.product.name}
                </h2>
                <p>
                    Thông tin chi tiết: {this.state.product.description}
                </p>
                <div>
                    Giá khởi điểm: {this.state.product.price}
                </div>
                <div>
                    Giá hiện tại: {this.state.product.currentBid}
                </div>
            </div>
        );
    }
}

export default Bidder;
