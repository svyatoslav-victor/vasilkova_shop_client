import React from "react";
import { Link } from 'react-router-dom';
import { CartItem } from "../../types";

import './Cart.scss';

type Props = {
  cart: CartItem[],
  clearCart: () => void,
  addItem: (id: string) => void,
  removeItem: (id: string) => void,
  removeProduct: (id: string, item: CartItem) => void,
}

export const Cart: React.FC<Props> = ({
  cart,
  clearCart,
  addItem,
  removeItem,
  removeProduct
}) => {
  return (
    <div className="cart">
      <div className="cart__heading">
        <h1>Cart</h1>
        <button
          className="cart__heading_button"
          style={{
            visibility: cart.length === 0 ? 'collapse' : 'visible'
          }}
          onClick={clearCart}
        >
          X
        </button>
      </div>

      {cart.length === 0
        ? (
            <div className="cart__empty">
              <p className="cart__empty_message">
                YOUR CART IS EMPTY :(
              </p>
            </div>
          )
        : (
            <div className="cart__contents">
              {cart.map((item: CartItem) => (
                <div
                  className="cart__contents_item"
                  key={item.productId}
                >
                  {item.images && (
                    <img
                      className="cart__contents_item_image"
                      src={`${process.env.REACT_APP_FILE_STORAGE}${item.images[0]}`}
                      alt="/"
                    />
                  )}

                  <div className="cart__contents_item_contents">
                    <div className="cart__contents_item_contents_namespace">
                      <p
                        className="cart__contents_item_contents_namespace--name"
                      >
                        {item.name}
                      </p>

                      <button
                        className="cart__contents_item_contents_namespace--remove"
                      >X</button>  
                    </div>

                    <div className="cart__contents_item_contents_details">
                      <div
                        className="cart__contents_item_contents_details--color"
                        style={{
                          backgroundColor: `${item.color}`
                        }}
                      />

                      <p
                        className="cart__contents_item_contents_details--price"
                      >
                        &#8372; {(item.price).toFixed(2)}
                      </p>
                    </div>

                    <p
                      className="cart__contents_item_description"
                    >
                      {item.description}
                    </p>

                    <div className="cart__contents_item_contents_customerSpecs">
                      <div className="cart__contents_item_contents_customerSpecs_quantity">
                        <p
                          className="cart__contents_item_contents_customerSpecs_quantity_heading"
                        >
                          Quantity:
                        </p>

                        <div
                          className="cart__contents_item_contents_customerSpecs_quantity_controls"
                        >
                          <button
                            className="cart__contents_item_contents_customerSpecs_quantity_controls--subtract"
                            onClick={(event) => {
                              event.stopPropagation();
                              removeItem(item._id);
                            }}
                          >
                            &#8722;
                          </button>

                          <p
                            className="cart__contents_item_contents_customerSpecs_quantity_controls--total"
                          >
                            {item.quantity}
                          </p>

                          <button
                            className="cart__contents_item_contents_customerSpecs_quantity_controls--add"
                            onClick={(event) => {
                              event.stopPropagation();
                              addItem(item._id);
                            }}
                          >
                            &#43;
                          </button>
                        </div>
                      </div>

                      <div
                        className="cart__contents_item_contents_customerSpecs_specs"
                      >
                        <p
                          className="cart__contents_item_contents_customerSpecs_specs--heading"
                        >
                          Size & other information:&nbsp;
                        </p>

                        <p
                          className="cart__contents_item_contents_customerSpecs_specs--info"
                        >
                          {item.specs}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart__contents_total">
                <span>Total:&nbsp;</span>
                <span>&#8372;&nbsp;
                  {cart.map((item: CartItem) => (
                    item.quantity * item.price
                  )).reduce((total, amount) => total + amount, 0).toFixed(2)}
                </span>
              </div>

              <Link
                className="cart__contents_total_checkout"
                to={'/vasilkova_shop_client/checkout'}
              >
                <button className="cart__contents_total_checkout--button">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
        )
      }
    </div>
  )
}
