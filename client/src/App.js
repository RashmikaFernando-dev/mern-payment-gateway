import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
        <h2>Stripe Payment Gateway</h2>
        <PaymentForm />
      </div>
    </Elements>
  );
}

export default App;
