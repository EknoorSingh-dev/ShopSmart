import { useContext } from "react";
import { CartContext } from "./CartContext";

function Cart() {
  const { cart, increase, decrease, total } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />

            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>

            <button onClick={() => decrease(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item.id)}>+</button>

            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))
      )}

      <h2>Cart Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;