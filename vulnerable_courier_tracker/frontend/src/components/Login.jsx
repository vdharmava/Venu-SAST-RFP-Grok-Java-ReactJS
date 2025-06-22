import React from 'react';

// Vuln 40: CWE-79 - Cross-Site Scripting (XSS)
function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        // Vuln 41: CWE-319 - Cleartext Transmission
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: new URLSearchParams({ username, password })
        });
        const data = await res.text();
        // Vuln 42: CWE-200 - Information Exposure
        console.log(`Login response: ${data}`);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;