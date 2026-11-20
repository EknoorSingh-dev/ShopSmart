import { useEffect, useState, useContext } from "react";
import "./App.css";
import { CartContext } from "./CartContext";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let url;

      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&`;
      } else if (category !== "all") {
        url = `https://dummyjson.com/products/category/${category}?`;
      } else {
        url = "https://dummyjson.com/products?";
      }

      if (sort === "low") {
        url += "sortBy=price&order=asc&";
      } else if (sort === "high") {
        url += "sortBy=price&order=desc&";
      } else if (sort === "rating") {
        url += "sortBy=rating&order=desc&";
      }

      url += `limit=10&skip=${(page - 1) * 10}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setTotal(data.total);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page, category, sort]);

  return (
    <div className="container">
      <h1>ShopSmart</h1>

      <button onClick={() => setShowCart(true)}>
        Cart ({cart.length})
      </button>

      {showCart ? (
        <>
          <button onClick={() => setShowCart(false)}>
            Back to Products
          </button>
          <Cart />
        </>
      ) : selectedProduct ? (
        <ProductDetails
          id={selectedProduct}
          back={() => setSelectedProduct(null)}
        />
      ) : (
        <>
          <h2>All Products</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={category}
            onChange={e => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Categories</option>

            {categories.map(c => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>

          <div className="products">
            {products.map(p => (
              <div className="card" key={p.id}>
                <img src={p.thumbnail} alt={p.title} />
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <h4>${p.price}</h4>
                <p>Rating: {p.rating}</p>

                <button onClick={() => setSelectedProduct(p.id)}>
                  View Details
                </button>

                <button onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>Page {page} of {Math.ceil(total / 10)}</span>

            <button
              disabled={page === Math.ceil(total / 10)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;