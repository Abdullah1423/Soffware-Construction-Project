// React user interface for the bidding system
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const AuctionApp = () => {
    const [currentBid, setCurrentBid] = useState("No bids yet");
    const [log, setLog] = useState([]);

    const handleNewBid = (bid, user) => {
        setCurrentBid(bid);
        setLog(prevLog => [...prevLog, `${user} placed a bid: ${bid}`]);
    };

    useEffect(() => {
        // Example notifications when a new bid is placed
        console.log(`Web Notification: New bid is ${currentBid}`);
    }, [currentBid]);

    return (
        <div>
            <h1>Bidding System</h1>
            <h2>Current Bid: {currentBid}</h2>
            <button onClick={() => handleNewBid("$1000", "Alice")}>Place Bid by Alice</button>
            <button onClick={() => handleNewBid("$1200", "Bob")}>Place Bid by Bob</button>
            <button onClick={() => handleNewBid("$1300", "Charlie")}>Place Bid by Charlie (Unauthorized)</button>
            <h3>Bid Log:</h3>
            <ul>
                {log.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.render(<AuctionApp />, document.getElementById('root'));

