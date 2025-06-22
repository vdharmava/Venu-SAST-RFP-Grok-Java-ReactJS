import React, { useState } from 'react';

// Vuln 46: CWE-79 - Cross-Site Scripting (XSS)
function TrackShipment() {
    const [result, setResult] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trackingNumber = e.target.trackingNumber.value;
        // Vuln 47: CWE-918 - SSRF
        const res = await fetch(`http://localhost:8080/shipments/track?trackingNumber=${trackingNumber}`);
        const data = await res.text();
        setResult(data);
    };

    return (
        <div>
            <h2>Track Shipment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="trackingNumber" placeholder="Tracking Number" />
                <button type="submit">Track</button>
            </form>
            <div dangerouslySetInnerHTML={{ __html: result }} /> {/* Vuln 48: CWE-79 */}
        </div>
    );
}

export default TrackShipment;