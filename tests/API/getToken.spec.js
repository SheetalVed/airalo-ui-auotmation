import { expect } from '@playwright/test';
import { test } from '../fixtures/tokenFixture.js';
import exp from 'constants';

test('submit Order', async ({ request, accessToken }) => {
  try {
    console.log(`access token is ${accessToken}`)
    const response = await request.post(
      "https://sandbox-partners-api.airalo.com/v2/orders",
      {
        form: {
          quantity: 1,
          package_id: "merhaba-7days-1gb",
          type: "sim",
        },
        headers: {
         Authorization: `Bearer ${accessToken}`,
        },
      }
    );
   expect(response.status()).toBe(200)

    const responseBody = await response.json()
    expect(responseBody.data).toHaveProperty('id')
    expect(responseBody.data).toHaveProperty('code')
    expect(responseBody.data).toHaveProperty('currency')
    expect(responseBody.data).toHaveProperty('esim_type')
    expect(responseBody.data).toHaveProperty('validity')
    expect(responseBody.data).toHaveProperty('package')
    expect(responseBody.data).toHaveProperty('data')
    expect(responseBody.data).toHaveProperty('price')
    expect(responseBody.data).toHaveProperty('created_at')
    expect(responseBody.data).toHaveProperty('manual_installation')
    expect(responseBody.data).toHaveProperty('qrcode_installation')
    expect(responseBody.data).toHaveProperty('installation_guides')
    expect(responseBody.data).toHaveProperty('text')
    expect(responseBody.data).toHaveProperty('voice')
    expect(responseBody.data).toHaveProperty('net_price')
    expect(responseBody.data).toHaveProperty('sims')
  } catch (error) {
    console.error("error is", error);
  }
});


test.skip("Get sim List", async ({ request, accessToken }) => {
  try{
    const response = await request.get(
      "https://sandbox-partners-api.airalo.com/v2/sims",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Response Status:", response.status());
  }
  catch(error){
    console.error('error is', error)
  }
});
