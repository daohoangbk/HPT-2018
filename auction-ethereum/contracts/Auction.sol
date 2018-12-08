pragma solidity ^0.4.23;
contract Auction {
  address public manager;
  uint public latestBid;
  address public latestBidder;
  bool public isBidding;

  constructor() public {
    manager = msg.sender;
    isBidding = false;
  }

  function auction(uint bid) public {
    latestBid = bid * 1 ether; //1000000000000000000;
    isBidding = true;
  }

  function bid() public payable {
    require(msg.value > latestBid);

    if (latestBidder != 0x0) {
      latestBidder.transfer(latestBid);
    }
    latestBidder = msg.sender;
    latestBid = msg.value;
  }

  function finishAuction() restricted public {
    manager.transfer(address(this).balance);
    isBidding = false;
  }

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
}
