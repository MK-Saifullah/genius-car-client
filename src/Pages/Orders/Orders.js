// import { success } from "daisyui/src/colors";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
 
 const {user, logOutUser} = useContext(AuthContext)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`https://genius-car-server-mk-saifullah.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
      }
    })
      .then((res) => {
        if(res.status === 401 || res.status === 403) {
          return logOutUser()
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setOrders(data)
      });
  }, [user?.email, logOutUser]);

  const handleDelete = (id) => {
    const proceed = window.confirm('Are you sure you want to delete?')
    // console.log(proceed)
    if(proceed) {
        fetch(`https://genius-car-server-mk-saifullah.vercel.app/orders/${id}`, {
            method: 'DELETE',
              headers: {
                authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
              }
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0) {
                alert('Deleted successfully');
                const remaining = orders.filter(odr => odr._id !== id);
                setOrders(remaining)
            }
        })
    }
}

const handleStatusUpdate = (id) => {
    fetch(`https://genius-car-server-mk-saifullah.vercel.app/orders/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('genius-car-token')}`
        },
        body: JSON.stringify({status: 'Approved'}),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.modifiedCount > 0) {
            const remaining = orders.filter(odr => odr._id !== id);
            const approving = orders.find(odr => odr._id === id);
            approving.status = "Approved";

            const newOrders = [approving, ...remaining]
            setOrders(newOrders)
        }
    })
}

  return (
    <div>
      <h2 className="text-5xl mb-2">You have {orders.length} orders </h2>
    
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {
                orders.map(order => <OrderRow
                    key = {order._id}
                    order = {order}
                    handleDelete = {handleDelete}
                    handleStatusUpdate = {handleStatusUpdate}
                ></OrderRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
