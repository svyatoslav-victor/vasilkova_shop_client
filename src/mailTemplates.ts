import { Order } from "./types";

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
                <td style="padding: 0.5em 0">${data.customerInfo.email}</td>
              </tr>`
            }
            ${data.customerInfo.company &&
              `<tr>
                <th style="padding: 0.5em 0; text-align: left;">Компанія:</th>
                <td style="padding: 0.5em 0">${data.customerInfo.company}</td>
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
                <div style="height: 2em; display: flex; align-items: center;">
                  <img src="cid:location" alt="/" style="height: 2em; width: 2em">
                  <a
                    href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F,+18,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/@46.4915117,30.734219,17z/data=!4m13!1m7!3m6!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!2z0YPQuy4g0J_RgNC40LzQvtGA0YHQutCw0Y8sIDE4LCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!3b1!8m2!3d46.4915117!4d30.7364077!3m4!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!8m2!3d46.4915117!4d30.7364077"
                    target="_blank"
                    style="padding-left: 1em; text-decoration: none; color: black;"
                  >
                    м. Одеса, вул. Приморська, 18
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="height: 2em; display: flex; align-items: center;">
                  <img src="cid:phone" alt="/" style="height: 2em; width: 2em">
                  <a
                    href="tel:+380504932903"
                    target="_blank"
                    style="padding-left: 1em; text-decoration: none; color: black;"
                  >
                    +38 050 493 29 03
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="height: 2em; display: flex; align-items: center;">
                  <img src="cid:email" alt="/" style="height: 2em; width: 2em">
                  <a
                    href="mailto:spetsuha.odessa@gmail.com"
                    target="_blank"
                    style="padding-left: 1em; text-decoration: none; color: black;"
                  >
                    spetsuha.odessa@gmail.com
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5em 0">
                <div style="height: 2em; display: flex; align-items: center;">
                  <img src="cid:web" alt="/" style="height: 2em; width: 2em">
                  <a
                    href="https://svyatoslav-victor.github.io/vasilkova_shop_client/"
                    target="_blank"
                    style="padding-left: 1em; text-decoration: none; color: black;"
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
        filename: "location.png",
        path: 'data:image/png;base64,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',
        cid: "location"
      },
      {
        filename: "smartphone.png",
        path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAADhElEQVRoge2bT0gUURzHP7uZlrYWLFiHXfsDJVnQpTJIIag8RAhBFHTJiE4dom7RrUOGHeoQWEG3IIjNLmWXQCjDorDORqUW6cWDlpnBuh3eb5y3/9z5szO7DfOFx9v9zu/N9333/ZvZmQfO0Qj0AuPAIpDxOC2KVi8Qc1FvR2gEPjqseDnSB3w2fUOER4H9QI0PmjVAu2hmgOs+aC5hXETbLca/Jr+VhnKODRUumod2iR+zGJ+FaM73S8BNIFKiXELyNxZ1MstwuXkpGJrJEnER4BZwsVhAt4j+BupLnMxopUrBin4DMC9xp3MP7gD+yMFuje8CHgDrighWOulYIcY2adwZiZsHtuvBT+TAHY3bjWrtDND2Hxg+INxnIK7x94R/bBA7UWvcLNAkXAQYkcDb5KMau3QdMCz8Q41fD/xEeWwFuCJBfVrQUcyZsM6ioJ8opp8A5lDmdmn8XYm/HAU6hXyqBRyTvA9YKGtVvcV34D6qh57UeMNbJ8AEyn1CC3gv3J4iJ67WFgY4LMdeatxGtLXbmLr1rmtcWDQ7EPQDy+lvwZy8DKwSbj6Kmokhe+2dkXxtGSvpF2ol/6txDZLPRYEp+aJ36U+S7/OwYl6hVfJvGmd4m4yixivAQS3AGORnKX2ZWW0wJqsXGndI8ncAJ1D9e1gLqAd+CH+uwEmrdQy3AWnUvKT32LcSfxxU/54S4ogWdEq4BWCbRUG/UEg/jurGGeCaxncJN4k2T13AnLabtOCrqGVrswVBP1FIf69wg8BK4eLAF+HP68G1mPelg5Qet9VoGNQNwmr5HEF5yQCvMH+EJWxAteYvgnF7WI/yMoG6ni6IOMUvNuwKegmr+s1k3zl5LugVHOvn/sUTeISGg47QcNARGg46QsNBR2g46AgNBx2h4aAjNBx0hIaDjtBw0BEaDjrcviNZyf+mHSFsYZuo1MNyxz3L7xZOAinUS3CzQD/Q4nMdHMHJs50kMK2VNdI02U/rvdJ3BSeCKSnzDGUwAQwI98gHfVdwIjhL/gtwSeFmCpYorz5QPbN01S9vTn7hfikzgGrZJPBcuJQP+q6QFkE7y1oLxSetrTbOUyPl0jbKuIbdTR4GEqgJakZSCntmATpE+6vNcq7QK6KjKNN+bePpwNzG0+OD5hJiqM1STl7bL0caAdZ47jIHMdRmqTHMMe1lSqO6cQ8udqX9A8tms/5v/EnzAAAAAElFTkSuQmCC',
        cid: "phone"
      },
      {
        filename: "email.png",
        path: 'data:image/png;base64,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',
        cid: "email"
      },
      {
        filename: "web.png",
        path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABp0lEQVRIid3Uu07VQRAG8J+YAwmJh4MNCdZeXsDYUIBoDQGFXgutjIn6EFwSfAhCJZr4Alp6ia2iaKvBxgsWVmqxA67L/jlHQyNfssnuN9/O7GVmOOzoxzzWsIFvMTaCmwtNI/r2sc3iJa7hI0YxjgmcwBauh2bmb059FMt4g/PB3ceNTHMT6zGfDO1SlwPvYhlP0In1cXzCsUzTxmcMx7qDp1js5nw2TtPOuGk8qGgfYipbD2Ez9FX0h+BCwa/gVkV/J2w5xvFOw8fP4+cBjcs7TvNPmcYVHCnGW5yu8GfixiV/1Z9Pt4vXOFnhtzBS4UfCVuKUVCd7sI3BCv8dAxV+IGwlBsMXesxb6eolmvb24UdN9F6q0BJfpBQs0Q5biVF8qAV4gbHKhq9+F12O4YYAY3he4c05uDS9VAvQ0lxotyv6WqFNSGnd2GFnIkj+5lN6axWdcF6tgRxLUuPar9kN2dvsnmGhm3PSxy9KTW/nuWrt+l7ML0q3XtB72iO1jk08wl2peM7iXMxX8DgO0vVZmtCSGtcqXoXj7ZivStnS+lfn/wd+ASHXeEMwImaYAAAAAElFTkSuQmCC',
        cid: "web"
      }
    ]
  }

  return mailData;
};
