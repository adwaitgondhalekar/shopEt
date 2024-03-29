import React from "react";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {detailsProduct} from '../actions/ProductActions';

function ProductScreen(props) {
  //const product = data.products.find(x => x._id === props.match.params.id);

  // 

  const[qty,setQty]=useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const productId = props.match.params.id;
  console.log(props.match.params.id)
  const { loading, product, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(productId));

    return () => {
      //
    };
  }, []);

  const AddToCartHandler = () =>
  {
      props.history.push("/cart/" + productId + "?qty=" + qty);
  }

  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product_details">
      <img
        src={product.image}
        alt="Product img"
        className="product_img"
      ></img>

      <span className="detail">
        <div className="title">{product.name}</div>
        <div className="description">{product.description}</div>
        <div className="rating">{product.rating} Stars</div>
        <div className="numreviews">{product.numreviews} Reviews</div>
        <div className="price">₹ {product.price}</div>
        <div className='status'>Status : {product.countInStock>0 ? "In Stock":"Unavailable"}</div>
        <div className="counter_addtocart">
          <div className="counter">
            Quantity: &nbsp;&nbsp;
            <select className="quantity" value={qty} onChange={(e) => {setQty(e.target.value)}}>
              {
                  [...Array(product.countInStock).keys()].map(x =>
                      <option key={x+1} value={x+1}>{x+1}</option>
                  )
              }
            </select>
          </div>
        </div>
        {product.countInStock>0 ? <button className="addtocart" onClick={AddToCartHandler}>Add to Cart</button>
        :<div className='outofstock'>Out of Stock</div>}
      </span>
    </div>
  );
}

export default ProductScreen;
