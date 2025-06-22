import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TrackShipment from './components/TrackShipment';
import AddShipment from './components/AddShipment';

// Vuln 39: CWE-352 - Missing CSRF Token
function App() {
    return (
        <div>
            <h1>Courier Tracker</h1>
            <Login />
            <Register />
            <TrackShipment />
            <AddShipment />
        </div>
    );
}

export default App;