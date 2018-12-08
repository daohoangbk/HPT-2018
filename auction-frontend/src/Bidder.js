import React, {
    Component
} from 'react';
import web3 from './web3';
import auction from './auction';

class Bidder extends Component {
    state = {
        isAdmin: false
    };

    async componentDidMount() {
        const manager = await auction.methods.manager().call();
        if (manager == manager) {
            this.setState({
                isAdmin: true
            });
        } else {
            this.setState({
                isAdmin: false
            });
        }
        console.log(this.state.isAdmin);
    }

    render() {
        return (
            <div>Bidder</div>
        );
    }
}

export default Bidder;
