import { useEffect } from "react";

function ThankYou() {
    useEffect(()=>{
        const order = localStorage.getItem('order');
        console.log("Order Generted", JSON.stringify(order));
        document.title="Thank You"
    })
  return (
    <div className="p-6 bg-green-100 rounded-lg shadow-md w-full max-w-md mx-auto text-center mt-[10%]">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your order has been successfully placed. We are preparing it and will notify you once it&apos;s ready.
      </p>
      <button
        onClick={() => window.location.href = '/menu'}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
      >
        Go Back to Menu
      </button>
    </div>
  );
}

export default ThankYou;