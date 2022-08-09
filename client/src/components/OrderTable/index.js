import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import Table from 'react-bootstrap/Table';
import spinner from "../../assets/spinner.gif";


function getDate(inputDate) {
    const [date,time] = inputDate.split(",");
    return date;
};

function OrderTable() {

    const { loading, data } = useQuery(QUERY_ME);
    const userOrders = data?.me.orders || {};
    
        return (
        <>
        { userOrders.length? (
        <Table striped>
            <thead> 
                <tr>
                    <th>Order Date</th>
                    <th>Product</th>
                    <th>Order Start Date</th>
                    <th>Order End Date</th>
                    <th>Cost</th>
                    </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td>{getDate(order.OrderDate)}</td>
                  <td>{order.rentedProduct.name}</td>
                  <td>{getDate(order.rentalStartDate)}</td>
                  <td>{getDate(order.rentalEndDate)}</td>
                  <td>{order.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>) : (
            <h3 className="d-flex align-items-center justify-content-center m-5">
              No products to rent!
           </h3>
          )
          }      
          {loading ? <img src={spinner} alt="loading" /> : null} 
        </>
        );
}
    
export default OrderTable;
    