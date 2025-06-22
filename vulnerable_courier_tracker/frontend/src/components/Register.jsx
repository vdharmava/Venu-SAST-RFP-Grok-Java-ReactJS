import React from 'react';

// Vuln 43: CWE-79 - Cross-Site Scripting (XSS)
function Register() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        // Vuln 44: CWE-319 - Cleartext Transmission
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            body: new URLSearchParams({ username, password, email })
        });
        const data = await res.text();
        // Vuln 45: CWE-79 - XSS
        document.body.innerHTML += data;
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="email" name="email" placeholder="Email" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;