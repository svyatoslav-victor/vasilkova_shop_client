import { E164Number } from "libphonenumber-js/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "react-phone-number-input/input";

import { CartItem, CustomerDetails } from "../../types";

import './Checkout.scss';

type Props = {
  cart: CartItem[],
  clearCart: () => void
}

export const Checkout: React.FC<Props> = ({ cart, clearCart }) => {
  const [phone, setPhone] = useState<E164Number>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: ''
  })

  const navigate = useNavigate();

  const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCustomer((prevState: CustomerDetails) => ({
      ...prevState,
      name: name,
      phone: phone!.toString(),
      email: email
    }));

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
        CHECKOUT
      </h1>

      {cart.length === 0
        ? <h3
            className="checkout__empty"
          >
            Nothing to check out! Please resume shopping ;)
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
                  Customer Details
                </legend>

                <div
                  className="checkout__content_customerInfo_fieldset"
                >
                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    Name*
                    <input
                      className="checkout__content_customerInfo_fieldset_label--input"
                      type="text"
                      name="name"
                      value={name}
                      placeholder="enter name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>

                  <label
                    className="checkout__content_customerInfo_fieldset_label"
                  >
                    Phone*
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
                      placeholder="enter e-mail"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>

                  <div
                    className="checkout__content_customerInfo_fieldset_confirm"
                  >
                    <p
                      className="checkout__content_customerInfo_fieldset_confirm--message"
                    >
                      Please review your order before checking out!
                    </p>
                    <button
                      className="checkout__content_customerInfo_fieldset_confirm--button"
                      disabled={!name || !phone}
                      onClick={handleCheckout}
                    >
                      Check Out
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

                      <p
                        className="checkout__content_items_item_details_attr--price"
                      >
                        &#8372;&nbsp;{(item.price).toFixed(2)}
                      </p>
                    </div>

                    <p
                      className="checkout__content_items_item_details_description"
                    >
                      {item.description}
                    </p>

                    <div className="checkout__content_items_item_details_specs">
                      <p
                        className="checkout__content_items_item_details_specs--quantity"
                      >
                        Quantity: {item.quantity}
                      </p>

                      <p
                        className="checkout__content_items_item_details_specs--info"
                      >
                        Customer Specifications: {item.specs}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="checkout__content_total">
                <span>Total: &nbsp;</span>
                <span>&#8372;&nbsp;
                  {cart.map((item: CartItem) => (
                    item.quantity * item.price
                  )).reduce((total, amount) => total + amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
