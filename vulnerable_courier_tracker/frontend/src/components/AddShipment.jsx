import React from 'react';

// Vuln 49: CWE-352 - Missing CSRF Token
function AddShipment() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trackingNumber = e.target.trackingNumber.value;
        const status = e.target.status.value;
        // Vuln 50: CWE-319 - Cleartext Transmission
        await fetch('http://localhost:8080/shipments/add', {
            method: 'POST',
            body: new URLSearchParams({ trackingNumber, status })
        });
    };

    return (
        <div>
            <h2>Add Shipment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="trackingNumber" placeholder="Tracking Number" />
                <input type="text" name="status" placeholder="Status" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddShipment;