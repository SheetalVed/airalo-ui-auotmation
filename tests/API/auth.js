const fetch = require('node-fetch');

async function generateAuthToken() {

 // Dynamically import node-fetch
  // const fetch =  (await import ('node-fetch')).default;

  //Definig API endpoints and credentials

  const tokenEndpoint = "https://sandbox-partners-api.airalo.com/v2/token";
  const clientID = "974d515d41f86868eccd2d22aae8d10e";
  const clientSecret = "tILYEqQRq5PnZ5nccQZ1IiVugUWhZN2UveJZ9rVa";

   // Create request payload
   const payload = new URLSearchParams({
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });

  const response = await fetch(tokenEndpoint, {
    method:'POST',
    body: payload
  });

  console.log(`Response Status: ${response.status}`);

    
  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch token: ${response.status} ${await response.text()}`
    );
  }

  const jsonResponse  = await response.json();
  console.log(jsonResponse)
  const {data}= jsonResponse
  //console.log(token_type);
  console.log(data);
  const {access_token} = data
  return access_token
};

module.exports = {generateAuthToken}


