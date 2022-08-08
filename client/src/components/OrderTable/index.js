import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from "../../utils/queries";
import Table from 'react-bootstrap/Table';


function OrderTable() {

    const { loading, data } = useQuery(QUERY_USER);
    const userprofile = data?.user|| {};
    const userOrders = userprofile.orders;

        return (
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
                  <td>{order.orderDate}</td>
                  <td>{order.rentedProduct.name}</td>
                  <td>{order.orderStartDate}</td>
                  <td>{order.orderEndDate}</td>
                  <td>{order.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

}
    
export default OrderTable;
    