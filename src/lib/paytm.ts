// Paytm Payment Gateway Integration - JS Checkout Flow

export interface PaytmOrderData {
  orderId: string;
  amount: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
}

export interface InitiatePaymentResponse {
  success: boolean;
  txnToken: string;
  orderId: string;
  mid: string;
  amount: string;
  isProduction: boolean;
  message: string;
}

// Backend URL - Use environment variable, defaults to Render production
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mv-traders-0007.onrender.com';

// Step 1: Call backend to initiate transaction and get txnToken
export const initiatePaytmPayment = async (orderData: PaytmOrderData): Promise<InitiatePaymentResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/initiate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to initiate payment');
    }

    return data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Step 2: Load Paytm JS Checkout SDK script dynamically
const loadPaytmScript = (mid: string, isProduction: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Remove any existing Paytm script
    const existingScript = document.getElementById('paytm-js-checkout');
    if (existingScript) {
      existingScript.remove();
    }

    const hostname = isProduction
      ? 'secure.paytmpayments.com'
      : 'securestage.paytmpayments.com';

    const script = document.createElement('script');
    script.id = 'paytm-js-checkout';
    script.type = 'application/javascript';
    script.src = `https://${hostname}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paytm JS Checkout SDK'));
    document.head.appendChild(script);
  });
};

// Step 3: Open Paytm JS Checkout with txnToken
export const openPaytmCheckout = async (
  paymentData: InitiatePaymentResponse,
  onSuccess: (response: Record<string, string>) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  try {
    const { txnToken, orderId, mid, amount, isProduction } = paymentData;

    // Load Paytm JS Checkout SDK
    await loadPaytmScript(mid, isProduction);

    const config = {
      root: '',
      flow: 'DEFAULT',
      data: {
        orderId: orderId,
        token: txnToken,
        tokenType: 'TXN_TOKEN',
        amount: amount,
      },
      handler: {
        notifyMerchant: function (eventName: string, data: unknown) {
          console.log('Paytm notifyMerchant:', eventName, data);
        },
        transactionStatus: function (paymentStatus: Record<string, string>) {
          console.log('Paytm transactionStatus:', paymentStatus);
          // Close the checkout
          if ((window as any).Paytm && (window as any).Paytm.CheckoutJS) {
            (window as any).Paytm.CheckoutJS.close();
          }
          if (paymentStatus.STATUS === 'TXN_SUCCESS') {
            onSuccess(paymentStatus);
          } else {
            onFailure(paymentStatus.RESPMSG || 'Payment failed');
          }
        },
      },
      merchant: {
        mid: mid,
        redirect: false,
      },
      mapClientMessage: {},
      labels: {},
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ['UPI', 'CARD', 'NB', 'LOGIN'],
      },
    };

    // Initialize and invoke Paytm checkout
    if ((window as any).Paytm && (window as any).Paytm.CheckoutJS) {
      await (window as any).Paytm.CheckoutJS.init(config);
      (window as any).Paytm.CheckoutJS.invoke();
    } else {
      throw new Error('Paytm CheckoutJS not loaded');
    }
  } catch (error) {
    console.error('Error opening Paytm checkout:', error);
    onFailure(error instanceof Error ? error.message : 'Failed to open payment page');
  }
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
