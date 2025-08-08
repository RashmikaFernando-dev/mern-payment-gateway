import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/payment', {
        amount: 1000, // $10.00
        token,
      });
      if (response.data && response.data.status === 'succeeded') {
        setMessage('Payment Successful!');
      } else {
        setMessage('Payment failed.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment error.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: 16 }}>
        {loading ? 'Processing...' : 'Pay $10'}
      </button>
      {message && <div style={{ marginTop: 16, color: message.includes('Success') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
}

export default PaymentForm;
