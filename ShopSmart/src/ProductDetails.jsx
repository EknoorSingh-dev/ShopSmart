import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";

function ProductDetails({ id, back }) {
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <button onClick={back}>Back</button>

      <img src={product.thumbnail} alt={product.title} />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <p>Rating: {product.rating}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;