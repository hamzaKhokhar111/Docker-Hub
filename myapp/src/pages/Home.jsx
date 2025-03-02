import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Pg9AiRusTI08ErCzBfrN1XzFvjy2juo60Uck6Ln3iq5mKsP9giBWG8Os68rtEs9JX0WTGkeLlqEW0bMqBu9efTa00YnSgPBdl");

function Home() {
  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
  });

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:5000/api/user/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Hamza Ashraf</h1>
      <p className="text-lg text-gray-300 text-center max-w-2xl">
        "A Future Star in the Making - Striving for Excellence Every Day!"
      </p>
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Buy React in just $ {product.price}
      </button>
    </div>
  );
}

export default Home;
