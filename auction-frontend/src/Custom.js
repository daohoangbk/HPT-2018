import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';
import Manager from './Manager';
import Bidder from './Bidder';

class Custom extends Component {
    state = {
        isAdmin: false
    };

    async componentDidMount() {
        const manager = await auction.methods.manager().call();
        const accounts = await web3.eth.getAccounts();
        if (accounts[0] == manager) {
            this.setState({
                isAdmin: true
            });
        } else {
            this.setState({
                isAdmin: false
            });
        }
    }

    render() {
        if (this.state.isAdmin) {
            return (
                <Manager/>
            );
        } else {
            return (
                <Bidder/>
            );
        }
    }
}

export default Custom;
