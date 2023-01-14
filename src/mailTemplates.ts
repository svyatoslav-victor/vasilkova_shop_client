import { Order } from "./types";

import logo from './shop_icons/engineer-worker-svgrepo-com.svg';
import mapIcon from './shop_icons/location.svg';
import phone from './shop_icons/smartphone-svgrepo-com.svg';
import email from './shop_icons/email.svg';
import web from './shop_icons/web-svgrepo-com.svg';

export const emailTemplate = (data: Order) => {
  let orderList: string = '';
  let field: string;

  for (field in data.productsDetails) {
    orderList += `
      <div>
        <p>Product ID: ${data.productsDetails[field].productId}</p>
        <p>Name: ${data.productsDetails[field].name}</p>
        <p>Color: </p>
        <div style="height: 20px; width: 20px; background-color: ${data.productsDetails[field].color}"></div>
        <p>Price: &#8372; ${data.productsDetails[field].price.toFixed(2)}</p>
        <p>Quantity: ${data.productsDetails[field].quantity}</p>
        <p>Specs: ${data.productsDetails[field].specs}</p>
      </div>
    `
  }

  const mailData = {
    name: data.customerInfo.name,
    email: data.customerInfo.email,
    subject: `Spetsuha Odessa: Order # ${data.orderId}`,
    html: `<h2>Hello, ${data.customerInfo.name}!</h2>
        <h3>Your order ID: ${data.orderId}</h3>
        <h3>Order details:</h3>
        <div style="border: 1px dotted black">${orderList}</div>
        <h2>Your Subtotal is: &#8372; ${data.subtotal.toFixed(2)}</h2>
        <br>
        <div>
          <h3>Customer:</h3>
          <ul style="list-style-type: none">
            <li>Name: ${data.customerInfo.name}</li>
            <li>Phone: ${data.customerInfo.phone}</li>
            ${data.customerInfo.email && `<li>Email: ${data.customerInfo.email}</li>`}
            ${data.customerInfo.company && `<li>Company: ${data.customerInfo.company}</li>`}
            <li>Preferred Delivery Option: ${data.customerInfo.deliveryAddress}</li>
          </ul>
        </div>
        <br>
        <p>If you have any questions, please contact us!</p>
        <br>
        <h4>Spetsuha Odessa</h4>
        <p>Odessa, 18 Primorskaya str</p>
        <a href="tel:+380933638593">+38 093 363 85 93</a>
        <a href="tel:+380504932903">+38 050 493 29 03</a>
        <p>spetsuha.odessa@gmail.com</p>
        <p>https://svyatoslav-victor.github.io/vasilkova_shop_client/</p>
      `
  }

  return mailData;
};
