// React user interface for the bidding system
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const AuctionApp = () => {
    const [currentBid, setCurrentBid] = useState("No bids yet");
    const [log, setLog] = useState([]);
    const [notifications, setNotifications] = useState([]);

    AuctionApp.addNotification = (message) => {
        setNotifications(prevNotifications => [...prevNotifications, message]);
    };

    const handleNewBid = (increment, user) => {
        // Parse currentBid as a number, defaulting to 0 if "No bids yet"
        const currentBidAmount = currentBid === "No bids yet" ? 0 : parseFloat(currentBid.replace("$", ""));
    
        // Calculate new bid based on the increment (100 for Alice, 250 for Bob)
        const newBidAmount = currentBidAmount + increment;
        const newBid = `$${newBidAmount.toFixed(2)}`; // Format as currency
    
        setCurrentBid(newBid);
    
        // Check if user is authorized (assuming only Alice and Bob are authorized here)
        if (user === "Alice" || user === "Bob") {
            setLog(prevLog => {
                // Add the new bid to the top of the log and keep only the last 3 entries
                const updatedLog = [`${user} placed a bid: ${newBid}`, ...prevLog];
                return updatedLog.slice(0, 3); // Limit log to 3 entries
            });
    
            setNotifications(prevNotifications => {
                // Add new notifications to the top and keep only the latest 12 notifications
                const updatedNotifications = [
                    `Notification: ${user} placed a bid of ${newBid}`,
                    `Email Notification: New bid is ${newBid}`,
                    `SMS Notification: New bid is ${newBid}`,
                    `Web App Notification: New bid is ${newBid}`,
                    ...prevNotifications
                ];
                return updatedNotifications.slice(0, 12); // Limit notifications to 12 entries
            });
        } else {
            setNotifications(prevNotifications => {
                // Add unauthorized notification and keep only the latest 12 entries
                const updatedNotifications = [
                    `Unauthorized Attempt: ${user} tried to place a bid of ${newBid}`,
                    ...prevNotifications
                ];
                return updatedNotifications.slice(0, 12); // Limit notifications to 12 entries
            });
        }
    };
    
    useEffect(() => {
        console.log(`Web Notification: New bid is ${currentBid}`);
    }, [currentBid]);


        return (
            <div className="auction-app">
                <header className="auction-header">
                    <h1>Bidding System</h1>
                </header>
                <div className="bid-info">
                    <h2>Current Bid: <span className="current-bid">{currentBid}</span></h2>
                    <div className="bid-buttons">
                        <button className="bid-button" onClick={() => handleNewBid(100, "Alice")}>Place Bid by Alice</button>
                        <button className="bid-button" onClick={() => handleNewBid(250, "Bob")}>Place Bid by Bob</button>
                        <button className="bid-button" onClick={() => handleNewBid(0, "Charlie")}>Place Bid by Charlie (Unauthorized)</button>
                    </div>
                </div>
                <div className="auction-container">
                    <div className="log-container">
                        <h3>Bid Log:</h3>
                        <ul className="log-list">
                            {log.slice(0, 3).map((entry, index) => ( // Show only the first 3 items
                                <li key={index} className="log-item">{entry}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="notifications-container">
                        <h3>Notification Panel:</h3>
                        <ul className="notifications-list">
                            {notifications.slice(0, 12).map((note, index) => ( // Show only the first 12 items
                                <li key={index} className="notification-item">{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
};

ReactDOM.render(<AuctionApp />, document.getElementById('root'));
export default AuctionApp;
