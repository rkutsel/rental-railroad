import React from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import "./style.css"



function getDate(inputDate) {
    const [date,time] = inputDate.split(",");
    return date;
};

function OrderTable(props) {
  
        return (
        <Container className = "p-5">
        { props.userOrders ? (
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
              {props.userOrders.map((order) => (
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
              No Orders!! 
           </h3>
          )
          }      
        </Container>
        );
}
    
export default OrderTable;
    