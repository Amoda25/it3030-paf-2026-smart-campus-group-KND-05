async function testRegistration() {
    console.log("--- Testing Port 8081 ---");
    try {
        const res8081 = await fetch('http://localhost:8081/api/facilities').catch(() => null);
        console.log("Port 8081 Status:", res8081 ? res8081.status : "DOWN");
    } catch (e) {
        console.log("Port 8081 Error:", e.message);
    }

    console.log("--- Testing Port 8080 ---");
    try {
        const res8080 = await fetch('http://localhost:8080/api/facilities').catch(() => null);
        console.log("Port 8080 Status:", res8080 ? res8080.status : "DOWN");
    } catch (e) {
        console.log("Port 8080 Error:", e.message);
    }
}

testRegistration();
