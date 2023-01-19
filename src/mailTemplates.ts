import { Order } from "./types";

import mapIcon from './shop_icons/location.svg';
import phone from './shop_icons/smartphone-svgrepo-com.svg';
import email from './shop_icons/email.svg';
import web from './shop_icons/web-svgrepo-com.svg';

export const emailTemplate = (data: Order) => {
  let orderList: string = '';
  let field: string;

  for (field in data.productsDetails) {
    orderList += `
      <div style="display: grid; grid-auto-flow: row; grid-template-columns: repeat(auto-fill, 320px); row-gap: 0.5em; column-gap: 0.5em; font-size: 0.8em;">
        <div style="display: flex; flex-direction: column; padding: 0.5em; border-radius: 10px; box-shadow: 0px 4px 35px rgb(41, 170, 177)">
          <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
            <span>Артикул:</span>
            <span>${data.productsDetails[field].productId}</span>
          </div>
          <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
            <span>Назва:</span>
            <span>${data.productsDetails[field].name}</span>
          </div>
            <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
              <span>Колір:</span>
              <div
                style="height: 20px; width: 20px; background-color: ${data.productsDetails[field].color}"
              >
              </div>
            </div>
            <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
              <span>Ціна:</span>
              <span>&#8372; ${data.productsDetails[field].price.toFixed(2)}</span>
            </div>
            <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
              <span>Кількість:</span>
              <span>${data.productsDetails[field].quantity}</span>
            </div>
            <div style="display: grid; grid-auto-flow: column; column-gap: 0.3em; grid-template-columns: 0.4fr 1fr; padding: 0.2em">
              <span>Специфікація замовника:</span>
              <span
                style="word-break: break-word;"
              >
                ${data.productsDetails[field].specs}
              </span>
            </div>
          </div>
        </div>
    `
  }

  const mailData = {
    name: data.customerInfo.name,
    email: data.customerInfo.email,
    subject: `Спецуха Одеса: замовлення № ${data.orderId}`,
    html: `<h3>Доброго дня, ${data.customerInfo.name}!</h3>
            <h5>Номер Вашого замовлення: ${data.orderId}</h5>
            <h5>Деталі замовлення:</h5>
            <div style="border-radius: 10px">${orderList}</div>
            <h3>Сума Вашого замовлення: &#8372; ${data.subtotal.toFixed(2)}</h3>
            <div>
              <h4>Контакти замовника:</h4>
              <div style="max-width: 320px; padding: 0 0.5em; font-size: 0.8em;">
                <div style="display: grid; grid-auto-flow: column; grid-template-columns: 1fr 1.5fr;">
                  <span>ПІБ:</span>
                  <span>${data.customerInfo.name}</span>
                </div>
                <div style="display: grid; grid-auto-flow: column; grid-template-columns: 1fr 1.5fr;">
                  <span>Телефон:</span>
                  <span>${data.customerInfo.phone}</span>
                </div>
                <div style="display: grid; grid-auto-flow: column; grid-template-columns: 1fr 1.5fr;">
                  <span>Email:</span>
                  <span>${data.customerInfo.email}</span>
                </div>
                <div style="display: grid; grid-auto-flow: column; grid-template-columns: 1fr 1.5fr;">
                  <span>Компанія:</span>
                  <span>${data.customerInfo.company}</span>
                </div>
                <p>Обраний спосіб доставки: ${data.customerInfo.deliveryAddress}</p>
              </div>
            </div>
            <br>
            <p style="font-weight: 700; font-size: 0.8em;">Якщо у Вас виникли питання, будь-ласка, зв'яжіться з нами!</p>
            <div style="width: 100%; height: 0.2em; border-radius: 5px; background-color: rgb(45, 185, 192);"></div>
            <div style="font-size: 0.8em; max-width: 320px; font-weight: 700">
              <p style="font-size: 1.2em">Контакти</p>
              <a
                href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F,+18,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/@46.4915117,30.734219,17z/data=!4m13!1m7!3m6!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!2z0YPQuy4g0J_RgNC40LzQvtGA0YHQutCw0Y8sIDE4LCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!3b1!8m2!3d46.4915117!4d30.7364077!3m4!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!8m2!3d46.4915117!4d30.7364077"
                target="_blank"
                style="display: grid; grid-auto-flow: column; column-gap: 0.5em; justify-content: center; align-items: center; grid-template-columns: 0.15fr 1fr; text-decoration: none; color: black;"
              >
                <img src=${mapIcon} alt="location.svg" style="width: 2em; height: 2em">
                <p>м. Одеса, вул. Приморська, 18</p>
              </a>
              <a
                href="tel:+380504932903"
                style="display: grid; grid-auto-flow: column; column-gap: 0.5em; justify-content: center; align-items: center; grid-template-columns: 0.15fr 1fr; text-decoration: none; color: black;"
              >
                <img src=${phone} alt="phone.svg" style="width: 2em; height: 2em">
                <p>+38 050 493 29 03</p>
              </a>
              <a
                href="mailto:spetsuha.odessa@gmail.com"
                target="_blank"
                style="display: grid; grid-auto-flow: column; column-gap: 0.5em; justify-content: center; align-items: center; grid-template-columns: 0.15fr 1fr; text-decoration: none; color: black;"
              >
                <img src=${email} alt="email.svg" style="width: 2em; height: 2em">
                <p>spetsuha.odessa@gmail.com</p>
              </a>
              <a
                href="https://svyatoslav-victor.github.io/vasilkova_shop_client/"
                style="display: grid; grid-auto-flow: column; column-gap: 0.5em; justify-content: center; align-items: center; grid-template-columns: 0.15fr 1fr; text-decoration: none; color: black;"
              >
                <img src=${web} alt="web.svg" style="width: 2em; height: 2em">
                <p>Спецуха Одесса</p>
              </a>
            </div>
      `
  }

  return mailData;
};
