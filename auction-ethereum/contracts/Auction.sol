pragma solidity ^0.4.23;

contract Auction {
    address public manager;
    uint public latestBid;
    uint public initBid;
    address public latestBidder;
    bool public isBidding;
    uint public timeBid;

    constructor() public {
        manager = msg.sender;
        isBidding = false;
    }

    function auction(uint bid) restricted public {
        initBid = bid * 1 ether; //1000000000000000000;
        isBidding = true;
        latestBid = initBid;
        timeBid = 0;
    }

    function bid() public payable {
        require(msg.value > latestBid);

        if (latestBidder != 0x0) {
            latestBidder.transfer(latestBid);
        }
        latestBidder = msg.sender;
        latestBid = msg.value;
        timeBid = 0;
    }

    function increaseTimeBid() restricted public {
        timeBid = timeBid + 1;
        if (timeBid == 2) {
            finishAuction();
        }
    }

    function finishAuction() restricted public {
        manager.transfer(address(this).balance);
        initParam();
    }

    function cancelAuction() restricted public {
        if (latestBidder != 0x0) {
            latestBidder.transfer(address(this).balance);
        }
        initParam();
    }

    function initParam() public{
        latestBid = 0;
        initBid = 0;
        latestBidder = 0;
        isBidding = false;
        timeBid = 0;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
