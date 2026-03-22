// Paytm Payment Gateway Integration

export interface PaytmConfig {
  mid: string;
  merchantKey: string;
  website: string;
  industryType: string;
  channelId: string;
}

export interface PaytmOrderData {
  orderId: string;
  amount: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
}

export const paytmConfig: PaytmConfig = {
  mid: import.meta.env.VITE_PAYTM_MID || '',
  merchantKey: import.meta.env.VITE_PAYTM_MERCHANT_KEY || '',
  website: import.meta.env.VITE_PAYTM_WEBSITE || 'DEFAULT',
  industryType: import.meta.env.VITE_PAYTM_INDUSTRY_TYPE || 'Retail',
  channelId: import.meta.env.VITE_PAYTM_CHANNEL_ID || 'WEB',
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:10000';

// Initiate payment by calling backend API
export const initiatePaytmPayment = async (orderData: PaytmOrderData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/initiate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate payment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Paytm payment form submission
export const submitPaytmForm = (params: Record<string, string>) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://securegw.paytm.in/order/process'; // Production URL
  // For testing: 'https://securegw-stage.paytm.in/order/process'

  Object.keys(params).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

// Verify transaction status
export const verifyTransaction = async (orderId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/verify-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify transaction');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
};
