import React from 'react';
import axios from 'axios';

const Payment = () => {
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const result = await axios.post('http://localhost:5000/create-order', {
      amount: 500, // amount in INR
    });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4', // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'Abhay Sharma',
      description: 'Test Transaction',
      order_id: order_id,
      handler: async function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '8707031321',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
};

export default Payment;
