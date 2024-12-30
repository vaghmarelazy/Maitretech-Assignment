import { useState, useEffect } from "react";
import Burger from "../assets/burger.jpeg";
import Coke from "../assets/coke.jpeg";
import Fries from "../assets/fries.jpeg";
import Pepsi from "../assets/pepsi.jpeg";
import Fork from "../assets/restaurant_24px.svg";
import Cart from "../assets/grocery-store.png";

function Menu() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState({});

  const items = [
    { name: "Hamburger", image: Burger, price: 200 },
    { name: "Fries", image: Fries, price: 100 },
    { name: "Coke", image: Coke, price: 50 },
    { name: "Pepsi", image: Pepsi, price: 50 },
  ];

  const handleAddToCart = (item) => {
    const itemQuantity = quantity[item.name] || 1;
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (!existingItem) {
      setCart([...cart, { ...item, quantity: itemQuantity }]);
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
            : cartItem
        )
      );
    }
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [item.name]: 1,
    }));
  };

  const handleRemoveFromCart = (itemName) => {
    const existingItem = cart.find((cartItem) => cartItem.name === itemName);
    if (existingItem?.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.name !== itemName));
    }
  };

  const handleIncreaseQuantity = (itemName) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: (prevQuantity[itemName] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (itemName) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [itemName]: Math.max((prevQuantity[itemName] || 1) - 1, 1),
    }));
  };

  const handleBuy = () => {
    const order = {
      orderId: new Date().getTime(),
      items: cart.map((cartItem) => ({
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
        total: cartItem.quantity * cartItem.price,
      })),
      totalAmount: total,
      date: new Date().toISOString(),
    };
    localStorage.setItem('order', JSON.stringify(order))
    window.location.href="/thankyou";
    setCart([]);
    setTotal(0);
  };

  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0
    );
    setTotal(totalAmount);
    document.title = "Item's Menu";
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="text-center">
      <header className="w-full bg-blue-600 text-white flex items-center justify-between h-16 p-4 text-xl">
        <div className="flex gap-3">
          <img src={Fork} alt="Fork" className="w-8" />
          <h1 className="font-semibold">Food&apos;s Restaurant</h1>
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleCart}
        >
          <img src={Cart} alt="Cart" className="w-8" />
          <span className="text-sm fixed flex items-center justify-center bg-black w-5 h-5 text-white rounded-full p-1 right-3 top-4 border-white border-2">
            <span className="flex items-center justify-center">
              {cart.length}
            </span>
          </span>
        </div>
      </header>

      <div className="w-full flex items-center justify-center mt-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 w-[70%]">
          {items.map((item, index) => (
            <div
              key={index}
              className="menu-item bg-gray-100 shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-lg text-gray-600 mb-2">Price: ₹{item.price}</p>

              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  className="bg-gray-300 p-2 rounded-md text-xl hover:bg-gray-400"
                  onClick={() => handleDecreaseQuantity(item.name)}
                >
                  -
                </button>
                <span className="text-xl">
                  {quantity[item.name] || 1}
                </span>
                <button
                  className="bg-gray-300 p-2 rounded-md text-xl hover:bg-gray-400"
                  onClick={() => handleIncreaseQuantity(item.name)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[50%]">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cart.length > 0 ? (
              <ul className="space-y-4">
                {cart.map((cartItem, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span className="text-lg">
                      {cartItem.name} - ₹{cartItem.price} x {cartItem.quantity}{" "}
                      = ₹{cartItem.price * cartItem.quantity}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleIncreaseQuantity(cartItem.name)}
                        className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-150"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(cartItem.name)}
                        className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-150"
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            <h3 className="text-xl font-semibold mt-4">Total: ₹{total}</h3>
            <button
              onClick={toggleCart}
              className="mt-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-150"
            >
              Close
            </button>
            {cart.length > 0 && (
              <button
                onClick={handleBuy}
                className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150"
              >
                Buy
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
