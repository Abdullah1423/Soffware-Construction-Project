// Auction class
class Auction {
    constructor() {
        this.bidders = [];
        this.currentBid = null;
        this.users = []; // List of users who can set bids
    }

    // Method to add a user who can set bids
    addUser(user) {
        this.users.push(user);
    }

    // Method to register a bidder
    registerBidder(bidder) {
        this.bidders.push(bidder);
    }

    // Method to deregister a bidder
    removeBidder(bidder) {
        this.bidders = this.bidders.filter(b => b !== bidder);
    }

    // Method to notify all bidders of a bid change
    notifyBidders() {
        this.bidders.forEach(bidder => bidder.update(this.currentBid));
    }

    // Method to set a new bid and notify bidders
    setBid(newBid, user) {
        if (this.users.includes(user)) {
            console.log(`${user.name} set a new bid: "${newBid}"`);
            this.currentBid = newBid;
            this.notifyBidders();
        } else {
            console.log(`User ${user.name} is not authorized to set bids.`);
        }
    }

    // Method to set a random bid from authorized users
    setRandomBid() {
        if (this.users.length > 0) {
            const randomUser = this.users[Math.floor(Math.random() * this.users.length)];
            const randomBidAmount = `$${Math.floor(Math.random() * 1000) + 1000}`;
            this.setBid(`Bid placed at ${randomBidAmount}`, randomUser);
        } else {
            console.log("No users available to set a bid.");
        }
    }
}

// User class
class User {
    constructor(name) {
        this.name = name;
    }
}

// Bidder interface
class Bidder {
    update(currentBid) {
        throw new Error("Bidder update method should be implemented");
    }
}

// Concrete bidder classes
class EmailNotificationBidder extends Bidder {
    update(currentBid) {
        console.log(`Email Notification: Received update with new bid: ${currentBid}`);
    }
}

class SMSNotificationBidder extends Bidder {
    update(currentBid) {
        console.log(`SMS Notification: Received update with new bid: ${currentBid}`);
    }
}

class WebAppNotificationBidder extends Bidder {
    update(currentBid) {
        console.log(`Web App Notification: Received update with new bid: ${currentBid}`);
    }
}

// Simulation of the Observer pattern
const auction = new Auction();

// Create users
const user1 = new User("Alice");
const user2 = new User("Bob");
const user3 = new User("Charlie");

// Add users who can set bids
auction.addUser(user1);
auction.addUser(user2);

// Create bidders
const emailBidder = new EmailNotificationBidder();
const smsBidder = new SMSNotificationBidder();
const webAppBidder = new WebAppNotificationBidder();

// Register bidders
auction.registerBidder(emailBidder);
auction.registerBidder(smsBidder);
auction.registerBidder(webAppBidder);

// Simulate bid changes
auction.setBid("Bid placed at $1000", user1);
auction.setBid("Bid raised to $1200", user2);
auction.setBid("Bid raised to $1300", user3); // Unauthorized user

// Simulate random bid
auction.setRandomBid();
auction.setRandomBid();

// Deregister a bidder and simulate another bid change
auction.removeBidder(smsBidder);
auction.setBid("Bid closed at $1500", user1);

