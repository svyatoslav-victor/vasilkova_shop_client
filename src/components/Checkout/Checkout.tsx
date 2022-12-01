import { E164Number } from "libphonenumber-js/types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "react-phone-number-input/input";
import { emailTemplate } from "../../mailTemplates";

import { CartItem, Order } from "../../types";

import './Checkout.scss';

type Props = {
  cart: CartItem[],
  clearCart: () => void,
  hasPreorderGoods: boolean,
  hasAllPreorderGoods: boolean,
  isMobile: number
}

export const Checkout: React.FC<Props> = ({
  cart,
  clearCart,
  hasPreorderGoods,
  hasAllPreorderGoods,
  isMobile
}) => {
  const [phone, setPhone] = useState<E164Number>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [company, setCompany] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [postLocation, setPostLocation] = useState<string>('');
  const [postBranch, setPostBranch] = useState<string>('');
  const [confirmAddress, setConfirmAddress] = useState<boolean>(false);
  const [isWarehouseClicked, setIsWarehouseClicked] = useState<boolean>(false);
  const [isPostClicked, setIsPostClicked] = useState<boolean>(false);

  const getAllOrders = () => {
    return fetch('https://vasilkovashopserver.herokuapp.com/api/getAllOrders')
      .then(result => {
        if (!result.ok) {
          throw new Error(`${result.status} - ${result.statusText}`)
        }
  
        return result.json();
      })
  };

  const fetchOrders = async () => {
    const orderList = await getAllOrders();
    setOrders(orderList);
  };

  useEffect(() => {
    fetchOrders()
  }, [cart])

  const navigate = useNavigate();

  const handleAddressConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setConfirmAddress(true);
    setDeliveryAddress(`${postLocation} - branch # ${postBranch}`)
  }

  const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data: Order = {
      orderId: orders.length === 0 ? 1 : orders[orders.length - 1].orderId + 1,
      orderDate: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      productsDetails: cart.map((item: CartItem) => (
        item && {
          productId: item.productId,
          name: item.name,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
          specs: item.specs,
          image: item.images![0]
        }
      )),
      subtotal: cart.map((item: CartItem) => (
        item.quantity * item.price
      )).reduce((total, amount) => total + amount, 0),
      customerInfo: {
        name,
        phone: phone!.toString(),
        email,
        company,
        deliveryAddress: deliveryAddress
      },
      status: 'processing'
    }

    const mailBody = emailTemplate(data);

    fetch('https://vasilkovashopserver.herokuapp.com/api/createOrder', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => {
        console.log(error.message);
      })

    fetch('https://vasilkovashopserver.herokuapp.com/api/sendEmail', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mailBody)
    })
      .then(res => res.json())
      .then(async (res) => {
        const resData = await res;
        if (resData.status === 'success') {
          console.log('Success!');
        } else if (resData.status === 'fail') {
          console.log('Failed to send message!');
        }
      })
      .catch(err => err)
    
    setName('')
    setPhone('')
    setEmail('')

    clearCart();

    navigate({
      pathname: '/vasilkova_shop_client/thank_you',
    }, { replace: true });
  }

  return (
    <div className="checkout">
      <h1
        className="checkout__heading"
      >
        ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
      </h1>

      {cart.length === 0
        ? <h3
            className="checkout__empty"
          >
            Оформляти поки що нічого, кошик порожній ;)
          </h3>
        : (
          <div className="checkout__content">
            <form
              className="checkout__content_customerInfo"
              action="/"
            >
              <fieldset>
                <legend
                  className="checkout__content_customerInfo_legend"
                >
                  Дані покупця
                </legend>

                <div
                  className="checkout__content_customerInfo_fieldset"
                >
                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    ПІБ*
                    <input
                      className="checkout__content_customerInfo_fieldset_label--input"
                      type="text"
                      name="name"
                      value={name}
                      placeholder="вкажіть ПІБ"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>

                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    Телефон*
                    <Input
                      className="checkout__content_customerInfo_fieldset_label--input"
                      defaultCountry="UA"
                      placeholder='012 345 6789'
                      value={phone}
                      onChange={setPhone}
                      maxLength='12'
                    />
                  </label>

                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    E-mail
                    <input
                      className="checkout__content_customerInfo_fieldset_label--input"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="для підтверждення замовлення"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>

                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    Компанія
                    <input
                      className="checkout__content_customerInfo_fieldset_label--input"
                      type="company"
                      name="company"
                      value={company}
                      placeholder="вкажіть компанію"
                      onChange={(event) => setCompany(event.target.value)}
                    />
                  </label>

                  <div
                    className="checkout__content_customerInfo_fieldset_delivery"
                  >
                    <div
                      className="checkout__content_customerInfo_fieldset_delivery_info"
                      style={{
                        display: isWarehouseClicked || isPostClicked ? 'grid' : 'none'
                      }}
                    >
                      <div
                        className="checkout__content_customerInfo_fieldset_delivery_info_warehouse"
                        style={{
                          display: isWarehouseClicked ? 'grid' : 'none'
                        }}
                      >
                        Адреса складу: м. Одеса, вул. Приморська, 18
                      </div>

                      <div
                        className="checkout__content_customerInfo_fieldset_delivery_info_post"
                        style={{
                          display: isPostClicked ? 'grid' : 'none'
                        }}
                      >
                        <label
                          className="checkout__content_customerInfo_fieldset_delivery_info_post_label"
                        >
                          Місто*
                          <input
                            className="checkout__content_customerInfo_fieldset_delivery_info_post_label--input"
                            type="postLocation"
                            name="postLocation"
                            value={postLocation}
                            placeholder="введіть населенний пункт"
                            onChange={(event) => setPostLocation(event.target.value)}
                          />
                        </label>

                        <label
                          className="checkout__content_customerInfo_fieldset_delivery_info_post_label"
                        >
                          Відділення*
                          <input
                            className="checkout__content_customerInfo_fieldset_delivery_info_post_label--input"
                            type="postBranch"
                            name="postBranch"
                            value={postBranch}
                            placeholder="введіть номер відділення"
                            onChange={(event) => setPostBranch(event.target.value)}
                          />
                        </label>

                        <button
                          className="checkout__content_customerInfo_fieldset_delivery_info_post_confirmAddress"
                          onClick={handleAddressConfirmation}
                        >
                          Підтвердити адресу доставки
                        </button>
                      </div>
                    </div>

                    <div
                      className="checkout__content_customerInfo_fieldset_delivery_details"
                      style={{
                        display: !isWarehouseClicked && !isPostClicked ? 'grid' : 'none'
                      }}
                    >
                      <p
                        className="checkout__content_customerInfo_fieldset_delivery_details_heading"
                      >
                        Будь-ласка вкажіть спосіб доставки
                      </p>

                      <div
                        className="checkout__content_customerInfo_fieldset_delivery_details_options"
                      >
                        <div
                          className="checkout__content_customerInfo_fieldset_delivery_details_options--option"
                          onClick={() => {
                            setDeliveryAddress('Odessa, Primorskaya str., 18')
                            setIsWarehouseClicked(true)
                          }}
                        >
                          Самовивіз зі складу постачальника
                        </div>

                        <div
                          className="checkout__content_customerInfo_fieldset_delivery_details_options--option"
                          onClick={() => {
                            setIsPostClicked(true)
                          }}
                        >
                          Доставка Новою Поштою
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="checkout__content_customerInfo_fieldset_confirm"
                  >
                    <p
                      className="checkout__content_customerInfo_fieldset_confirm--message"
                    >
                      Будь-ласка перевірте замовлення перед підтвердженням!
                    </p>
                    <button
                      className="checkout__content_customerInfo_fieldset_confirm--button"
                      disabled={isPostClicked ? !name || !phone || !deliveryAddress || !confirmAddress : !name || !phone || !deliveryAddress}
                      onClick={handleCheckout}
                    >
                      ОФОРМИТИ
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>

            <div className="checkout__content_items">
              {cart.map((item: CartItem) => (
                <div
                  className="checkout__content_items_item"
                  key={item.productId}
                >
                  {item.images && (
                    <img
                      className="checkout__content_items_item--image"
                      src={`${process.env.REACT_APP_FILE_STORAGE}${item.images[0]}`}
                      alt="/"
                    />
                  )}

                  <div
                    className="checkout__content_items_item_details"
                  >
                    <p
                      className="checkout__content_items_item_details--name"
                    >
                      {item.name}
                    </p>

                    <div
                      className="checkout__content_items_item_details_attr"
                    >
                      <div
                        className="checkout__content_items_item_details_attr--color"
                        style={{
                          backgroundColor: `${item.color}`
                        }}
                      >
                      </div>

                      {item.price > 0
                        ? (<>
                            <div
                              className="checkout__content_items_item_details_attr--price"
                            >
                              <p
                                className="checkout__content_items_item_details_attr--price--one"
                              >
                                Вартість: &#8372; {(item.price).toFixed(2)}
                              </p>

                              <div className="checkout__content_items_item_details_attr--price--separator" />

                              <p
                                className="checkout__content_items_item_details_attr--price--all"
                              >
                                Всього: &#8372; {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </>)
                        : (<p
                              className="checkout__content_items_item_details_attr--price_pre-order"
                            >
                              Кінцева вартість має бути підтверджена 
                              постачальником після замовлення
                          </p>)
                      }
                    </div>

                    <p
                      className="checkout__content_items_item_details_description"
                      style={{
                        display: isMobile > 600 ? 'block' : 'none'
                      }}
                    >
                      {item.description}
                    </p>

                    <div className="checkout__content_items_item_details_specs">
                      <p
                        className="checkout__content_items_item_details_specs--quantity"
                      >
                        Кількість: {item.quantity}
                      </p>

                      <p
                        className="checkout__content_items_item_details_specs--info"
                      >
                        Специфікація замовника: {item.specs}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="checkout__content_total">
              {hasAllPreorderGoods
                  ? (<>
                      <span>Сума:&nbsp;</span>
                      <span>
                        має бути підтверджена постачальником
                      </span>
                    </>)
                  : (hasPreorderGoods
                    ? (<>
                        <span>Сума:&nbsp;(має бути підтверджена постачальником)</span>
                        <span>&#8372;&nbsp;
                          {cart.map((item: CartItem) => (
                            item.quantity * item.price
                          )).reduce((total, amount) => total + amount, 0).toFixed(2)}
                        </span>
                      </>)
                    : (
                      <>
                        <span>Сума:&nbsp;</span>
                        <span>&#8372;&nbsp;
                          {cart.map((item: CartItem) => (
                            item.quantity * item.price
                          )).reduce((total, amount) => total + amount, 0).toFixed(2)}
                        </span>
                      </>
                    )
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
