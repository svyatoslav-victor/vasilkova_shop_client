import { Order } from "./types";

import logo from './shop_icons/engineer-worker-svgrepo-com.svg'
import mapIcon from './shop_icons/location.svg';
import phone from './shop_icons/smartphone-svgrepo-com.svg';
import email from './shop_icons/email.svg';
import web from './shop_icons/web-svgrepo-com.svg';

export const emailTemplate = (data: Order) => {
  let orderList: string = '';
  let field: string;

  for (field in data.productsDetails) {
    orderList += `
      <div style="border-radius: 10px">
        <table style="table-layout: fixed; width: 300px; font-size: 0.8em; padding: 0.5em 0">
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Артикул:</th>
            <td style="padding: 0.5em 0">${data.productsDetails[field].productId}</td>
          </tr>
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Назва:</th>
            <td style="padding: 0.5em 0; word-break: break-word">${data.productsDetails[field].name}</td>
          </tr>
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Колір:</th>
            <td style="padding: 0.5em 0">
              <div
                style="height: 20px; width: 20px; background-color: ${data.productsDetails[field].color}"
              >
              </div>
            </td>
          </tr>
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Ціна:</th>
            <td style="padding: 0.5em 0">&#8372; ${data.productsDetails[field].price.toFixed(2)}</td>
          </tr>
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Кількість:</th>
            <td style="padding: 0.5em 0">${data.productsDetails[field].quantity}</td>
          </tr>
          <tr>
            <th style="padding: 0.5em 0; text-align: left;">Специфікація замовника:</th>
            <td style="word-break: break-word;">${data.productsDetails[field].specs}</td>
          </tr>
        </table>
      </div>
    `
  }

  const mailData = {
    name: data.customerInfo.name,
    email: data.customerInfo.email,
    subject: `Спецуха Одеса: замовлення № ${data.orderId}`,
    html: `
      <div style="padding: 0.5em; border-radius: 10px; font-family: Arial, Helvetica, sans-serif">
        <h3 style="margin: 0; padding: 0.5em 0">Доброго дня, ${data.customerInfo.name}!</h3>
        <h4 style="margin: 0; padding: 0.5em 0">Номер Вашого замовлення: ${data.orderId}</h4>
        <h4 style="margin: 0; padding: 0.5em 0">Деталі замовлення:</h4>
        <div style="border-radius: 10px">${orderList}</div>
        <div style="width: 100%; height: 0.2em; border-radius: 5px; background-color: rgb(45, 185, 192);"></div>
        <h3 style="margin: 0; padding: 0.5em 0">Сума Вашого замовлення: &#8372; ${data.subtotal.toFixed(2)}</h3>
        <div>
          <h4 style="margin: 0; padding: 0.5em 0">Контакти замовника:</h4>
          <table style="table-layout: fixed; width: 300px; font-size: 0.8em; padding: 0.5em 0">
            <tr>
              <th style="padding: 0.5em 0; text-align: left;">ПІБ:</th>
              <td style="padding: 0.5em 0">${data.customerInfo.name}</td>
            </tr>
            <tr>
              <th style="padding: 0.5em 0; text-align: left;">Телефон:</th>
              <td style="padding: 0.5em 0; word-break: break-word">${data.customerInfo.phone}</td>
            </tr>
            ${data.customerInfo.email &&
              `<tr>
                <th style="padding: 0.5em 0; text-align: left;">Email:</th>
                <td style="padding: 0.5em 0">email</td>
              </tr>`
            }
            ${data.customerInfo.company &&
              `<tr>
                <th style="padding: 0.5em 0; text-align: left;">Компанія:</th>
                <td style="padding: 0.5em 0">company</td>
              </tr>`
            }
            <tr>
              <th style="padding: 0.5em 0; text-align: left;">Обраний спосіб доставки:</th>
              <td style="word-break: break-word;">${data.customerInfo.deliveryAddress}</td>
            </tr>
          </table>
        </div>
        <p style="font-weight: 700; font-size: 0.9em;">Якщо у Вас виникли питання, будь-ласка, зв'яжіться з нами!</p>
        <div style="width: 100%; height: 0.2em; border-radius: 5px; background-color: rgb(45, 185, 192);"></div>
        <div style="font-size: 0.8em; max-width: 300px">
          <p style="font-size: 1.2em; margin: 0; padding: 1em 0; font-weight: 700;">Контакти</p>
          <table style="width: 300px">
            <tr>
              <td style="padding: 0.5em 0">
                <div style="background-image: url('cid:location'); background-repeat: no-repeat; height: 2em; display: flex; align-items: center;">
                  <a
                    href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F,+18,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/@46.4915117,30.734219,17z/data=!4m13!1m7!3m6!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!2z0YPQuy4g0J_RgNC40LzQvtGA0YHQutCw0Y8sIDE4LCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!3b1!8m2!3d46.4915117!4d30.7364077!3m4!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!8m2!3d46.4915117!4d30.7364077"
                    target="_blank"
                    style="padding-left: 3em; text-decoration: none; color: black;"
                  >
                    м. Одеса, вул. Приморська, 18
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="background-image: url('cid:phone'); background-repeat: no-repeat; height: 2em; display: flex; align-items: center;">
                  <a
                    href="tel:+380504932903"
                    target="_blank"
                    style="padding-left: 3em; text-decoration: none; color: black;"
                  >
                    +38 050 493 29 03
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="background-image: url('cid:email'); background-repeat: no-repeat; height: 2em; display: flex; align-items: center;">
                  <a
                    href="mailto:spetsuha.odessa@gmail.com"
                    target="_blank"
                    style="padding-left: 3em; text-decoration: none; color: black;"
                  >
                    spetsuha.odessa@gmail.com
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="background-image: url('cid:web'); background-repeat: no-repeat; height: 2em; display: flex; align-items: center;">
                  <a
                    href="https://svyatoslav-victor.github.io/vasilkova_shop_client/"
                    target="_blank"
                    style="padding-left: 3em; text-decoration: none; color: black;"
                  >
                    Спецуха Одесса
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: "location.svg",
        filePath: "https://svyatoslav-victor.github.io/vasilkova_shop_client/static/media/location.f22bcedfc14958a505a9a98e86176c7e.svg",
        cid: "location"
      },
      {
        filename: "smartphone-svgrepo-com.svg.svg",
        filePath: "https://svyatoslav-victor.github.io/vasilkova_shop_client/static/media/smartphone-svgrepo-com.5f9c25aa778066eef28da9c183aff687.svg",
        cid: "phone"
      },
      {
        filename: "email.svg",
        filePath: "https://svyatoslav-victor.github.io/vasilkova_shop_client/static/media/email.4c6092f9ad79c01666c39cf0f701cbea.svg",
        cid: "email"
      },
      {
        filename: "web-svgrepo-com.svg",
        filePath: "https://svyatoslav-victor.github.io/vasilkova_shop_client/static/media/web-svgrepo-com.227ebcb0cfdcf30eaacceb029f6d99c3.svg",
        cid: "web"
      }
    ]
  }

  return mailData;
};
