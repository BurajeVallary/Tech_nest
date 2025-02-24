document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if the api object is properly loaded from preload.js
  if (typeof window.api === 'undefined' || typeof window.api.getApiKey !== 'function' || typeof window.api.getApiSecret !== 'function') {
    alert('API credentials are not available.');
    return;
  }

  // Fetch API credentials from preload.js
  const apiKey = await window.api.getApiKey();
  const apiSecret = await window.api.getApiSecret();

  const requestBody = {
    apiKey: apiKey,
    apiSecret: apiSecret,
    extraData: { ipAddress: '192.168.1.1' }  // Replace with actual IP fetch logic
  };

  try {
    const response = await fetch('https://dev.tellerpoint.hextremelabs.com/Tellerpoint/rpc/merchant/external/authenticate', {
      method: 'POST',
      headers: { 'accept': 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.entity && data.entity.sessionId) {
        const sessionId = data.entity.sessionId;
        
        // Store the session ID in sessionStorage (no need to pass in URL)
        sessionStorage.setItem('sessionId', sessionId);
        alert('Login Successful!');

        // Redirect to the dashboard (without passing session ID in the URL)
        window.location.href = 'dashboard.html';
      } else {
        alert('Session ID is missing.');
      }
    } else {
      alert('Authentication failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
});
