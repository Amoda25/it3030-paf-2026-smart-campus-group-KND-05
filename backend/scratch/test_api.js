const fetch = require('node-fetch');

async function testRegistration() {
    const data = {
        name: "Test Facility from Script",
        type: "Lab",
        capacity: 50,
        location: "Test Building",
        status: "ACTIVE",
        description: "Testing backend connectivity",
        imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaadeff171",
        availabilityWindows: ["08:00-17:00"]
    };

    try {
        console.log("Sending test registration to http://localhost:8081/api/facilities...");
        const response = await fetch('http://localhost:8081/api/facilities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Response Body:", text);

        if (response.ok) {
            console.log("SUCCESS: Backend is working and saving data.");
        } else {
            console.log("FAILURE: Backend returned an error.");
        }
    } catch (error) {
        console.error("ERROR: Could not connect to backend. Is it running on 8081?", error.message);
    }
}

testRegistration();
