import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";


function App() {

const [product, setProcduct] = useState({
  name: "React for Sai",
  price: 10,
  productBy: "Online Learning"
});
const makePayment = token => {
  const body = {
    token,
    product
  }
  const headers ={
    "Content-Type": "application/json"
  }

  return fetch(`http://localhost:8080/payment`,{
    method:"POST",
    headers,
    body: JSON.stringify(body)
  }).then(response => {
    console.log("RESPONSE", response);
    const {status} = response;
    console.log("STATUS", status)
  })
  .catch(error => console.log(error));
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="###"
          target="blank"
          rel="noopener noreferrer">
          Learn React
          <StripeCheckout 
          stripeKey={process.env.REACT_APP_Key}
          token={makePayment}
          name="Learning Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
          >
          <button className="btn-large blue">Learn react from online{product.price}</button>
          </StripeCheckout>

        </a>
      </header>
    </div>
  );
}

export default App;
