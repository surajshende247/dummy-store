import React from 'react'
import axios from 'axios'

import "./App.css"

function App() {

  const paymentHandler = (response)=>{
    console.log(response)
    alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature)
  }

  const initPayment = async (amount) => {

    const {data} = await axios.post("/createOrder", {
      amount: amount,
      notes: {
        user: "Test User",
        item: "Woodland ke shoes"
      }
    })

    const orderId = data.order.id

    const options = {
      "key": "rzp_test_Hx1u2oka1Tudh0",
      "amount": amount * 100,
      "currency": "INR",
      "name": "Road To Code",
      "description": "Learn Programming In Easy Way",
      "image": "https://www.roadtocode.org/static/media/logo.8dd0bf20731ffeceb4ee.png",
      "order_id": orderId,
      "handler": paymentHandler,
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#ffebcd"
      }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();

  rzp.on('payment.failed', function (response){
    alert('Payment Failed')
    console.log(response);
});
  }
  return (
    <div>
      <h1 className='text-center'>Buy Products</h1>

      <div class="card product-card">
        <img src="https://rukminim1.flixcart.com/image/832/832/l41n2q80/shoe/u/2/m/-original-imagfywby9n2tyyr.jpeg?q=70" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Woodland Shoes</h5>
          <p class="card-text">₹ 5000</p>
          <button type="button" onClick={()=>{initPayment(5000)}} class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default App
