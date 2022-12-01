import React, { Dispatch, SetStateAction } from "react";
import { Link } from 'react-router-dom';
import { CartItem } from "../../types";

import bin from '../../shop_icons/bin-svgrepo-com.svg';

import './Cart.scss';

type Props = {
  cart: CartItem[],
  clearCart: () => void,
  addItem: (id: string) => void,
  removeItem: (id: string) => void,
  removeProduct: (id: string, item: CartItem) => void,
  hasPreorderGoods: boolean,
  hasAllPreorderGoods: boolean,
  editSpecs: (id: string, newSpecs: string) => void,
  resetEditSpecs: () => void,
  cartItemId: string,
  setCartItemId: Dispatch<SetStateAction<string>>,
  newSpecs: string,
  setNewSpecs: Dispatch<SetStateAction<string>>
}

export const Cart: React.FC<Props> = ({
  cart,
  clearCart,
  addItem,
  removeItem,
  removeProduct,
  hasPreorderGoods,
  hasAllPreorderGoods,
  editSpecs,
  resetEditSpecs,
  cartItemId,
  setCartItemId,
  newSpecs,
  setNewSpecs
}) => {
  return (
    <div className="cart">
      <div className="cart__heading">
        <h1>КОШИК</h1>
        <img
          className="cart__heading_button"
          src={bin}
          alt="/"
          style={{
            visibility: cart.length === 0 ? 'collapse' : 'visible'
          }}
          onClick={clearCart}
        />
      </div>

      {cart.length === 0
        ? (
            <div className="cart__empty">
              <p className="cart__empty_message">
                Ваш кошик порожній :(
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
                        onClick={() => removeProduct(item._id, item)}
                      >
                        X
                      </button>  
                    </div>

                    <div className="cart__contents_item_contents_details">
                      <div
                        className="cart__contents_item_contents_details--color"
                        style={{
                          backgroundColor: `${item.color}`
                        }}
                      />

                      {item.price > 0
                        ? (<>
                            <div
                              className="cart__contents_item_contents_details--price"
                            >
                              <p
                                className="cart__contents_item_contents_details--price--one"
                              >
                                Вартість: &#8372; {(item.price).toFixed(2)}
                              </p>

                              <div className="cart__contents_item_contents_details--price--separator" />

                              <p
                                className="cart__contents_item_contents_details--price--all"
                              >
                                Всього: &#8372; {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                        </>)
                        : (<p
                            className="cart__contents_item_contents_details--price_pre-order"
                            >
                              Кінцева вартість має бути підтверджена 
                              постачальником після замовлення
                          </p>)
                      }
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
                          Кількість:
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
                          Розмір та інша інформація:&nbsp;
                        </p>

                        <div className="cart__contents_item_contents_customerSpecs_specs_details">
                          <p
                            className="cart__contents_item_contents_customerSpecs_specs_details--info"
                          >
                            {item.specs}
                          </p>

                          <span
                            id={item._id}
                            className="cart__contents_item_contents_customerSpecs_specs_details--change"
                            onClick={(event) => setCartItemId(event.currentTarget.id)}
                          >
                            &#9998;
                          </span>

                          <div
                            className="cart__contents_item_contents_customerSpecs_specs_details_edit"
                            style={{
                              display: cartItemId === item._id ? 'grid' : 'none'
                            }}
                          >
                            <textarea
                              className="cart__contents_item_contents_customerSpecs_specs_details_edit--text"
                              cols={40}
                              rows={3}
                              value={newSpecs}
                              onChange={(event) => setNewSpecs(event.target.value)}
                            />

                            <div className="cart__contents_item_contents_customerSpecs_specs_details_edit_buttons">
                              <button
                                className="cart__contents_item_contents_customerSpecs_specs_details_edit_buttons--button"
                                onClick={() => {
                                  editSpecs(cartItemId, newSpecs);
                                  resetEditSpecs();
                                }}
                              >
                                &#10004;
                              </button>

                              <button
                                className="item_specs_edit_buttons--button"
                                onClick={resetEditSpecs}
                              >
                                &#10008;
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart__contents_total">
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

              <Link
                className="cart__contents_total_checkout"
                to={'/vasilkova_shop_client/checkout'}
              >
                <button className="cart__contents_total_checkout--button">
                  ОФОРМИТИ ЗАМОВЛЕННЯ
                </button>
              </Link>
            </div>
        )
      }
    </div>
  )
}
