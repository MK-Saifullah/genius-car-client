import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {

  const { title, price, _id } = useLoaderData();
  const { user } = useContext(AuthContext);

//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';

  const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form =event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        console.log(name, phone, email, message);

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        if(phone.length < 9) {
            alert ('Your phone number must be at least more than 9 characters long')
        }
        else {
            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
                },
                body: JSON.stringify(order)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged) {
                    alert('Your order has been added successfully')
                    form.reset();
                }
            })
            .catch(err => console.error(err))

        }
  }
  return (
    <div>
      <h2 className="text-4xl"> You are about to order: {title}</h2>
      <h4 className="text-3xl mb-4">Price: ${price}</h4>
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text" name='firstName'
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            type="text" name='lastName'
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          <input
            type="number" name='phone'
            placeholder="Your Phone Number"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text" name='emailAddress'
            placeholder="Your Email Address"
            className="input input-bordered w-full "
            defaultValue={user?.email}
            readOnly
          />
        </div>
        <textarea
          className=" mt-5 textarea textarea-bordered h-24 w-full"
          placeholder="Your Message" name='message'
        ></textarea>

        <input className="btn btn-block mb-2 mt-2 bg-red-700" type="submit" name="" value="Place your order"/>
      </form>
    </div>
  );
};

export default Checkout;
