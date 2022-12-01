import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../types";
import classNames from "classnames";

import bin from '../../shop_icons/bin-svgrepo-com.svg';
import './MiniCart.scss';

type Props = {
  cart: CartItem[],
  showMiniCart: boolean,
  toggleMiniCart: () => void,
  productCount: number,
  addItem: (id: string) => void,
  removeItem: (id: string) => void,
  removeProduct: (id: string, item: CartItem) => void,
  clearCart: () => void,
  hasPreorderGoods: boolean,
  hasAllPreorderGoods: boolean,
  isMobile: number,
  editSpecs: (id: string, newSpecs: string) => void,
  resetEditSpecs: () => void,
  cartItemId: string,
  setCartItemId: Dispatch<SetStateAction<string>>,
  newSpecs: string,
  setNewSpecs: Dispatch<SetStateAction<string>>
}

export const MiniCart: React.FC<Props> = ({
  cart,
  showMiniCart,
  productCount,
  toggleMiniCart,
  addItem,
  removeItem,
  removeProduct,
  clearCart,
  hasPreorderGoods,
  hasAllPreorderGoods,
  isMobile,
  editSpecs,
  resetEditSpecs,
  cartItemId,
  setCartItemId,
  newSpecs,
  setNewSpecs
}) => {
  return (
    <div
      className="minicart"
      style={{
        visibility: showMiniCart ? 'visible' : 'hidden',
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        className="minicart__contents"
      >
        Мій кошик:&nbsp;
        <img
          className="minicart__contents--clearCart"
          src={bin}
          alt="/"
          onClick={clearCart}
        />
      </div>
      {productCount === 0 && (
        <h3
          className="minicart--empty"
        >
          ВАШ КОШИК ПОРОЖНІЙ
        </h3>
      )}

      <div className="minicart__products">
        {cart.map((item: CartItem, index: number) => (
          <div
            key={index}
            className='minicart__products--item'
          >
            <button
              className="item_remove"
              onClick={(event) => {
                event.stopPropagation();
                removeProduct(item._id, item)
              }}
            >
              X
            </button>

            {item.images && (
              <div
                className="item_image"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_FILE_STORAGE}${item.images[0]})`
                }}
              >
              </div>
            )}
            <p className="item_name">{item.name}</p>

            <div className="item_specs">
              <p
                className="item_specs--info"
              >
                {item.specs}
              </p>

              <span
                id={item._id}
                className="item_specs--change"
                onClick={(event) => setCartItemId(event.currentTarget.id)}
              >
                &#9998;
              </span>

              <div
                className="item_specs_edit"
                style={{
                  display: cartItemId === item._id ? 'grid' : 'none'
                }}
              >
                <textarea
                  className="item_specs_edit--text"
                  cols={20}
                  rows={3}
                  value={newSpecs}
                  onChange={(event) => setNewSpecs(event.target.value)}
                />

                <div className="item_specs_edit_buttons">
                  <button
                    className="item_specs_edit_buttons--button"
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

            <div className="item_quantity">
              <button
                className={classNames(
                  isMobile < 600 ? "item_quantity--subtract" : "item_quantity--add"
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  isMobile < 600 ? removeItem(item._id) : addItem(item._id);
                }}
              >
                {isMobile < 600 ? <span>&#8722;</span> : <span>&#43;</span>}
              </button>
              <p
                className="item_quantity--total"
              >
                {item.quantity}
              </p>
              <button
                className={classNames(
                  isMobile < 600 ? "item_quantity--add" : "item_quantity--subtract"
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  isMobile < 600 ? addItem(item._id) : removeItem(item._id);
                }}
              >
                {isMobile < 600 ? <span>&#43;</span> : <span>&#8722;</span>}
              </button>
            </div>
            <div
              className="item_price"
            >
              {item.price > 0
                ? (<>
                    <p
                      className="item_price--one"
                    >
                      Вартість: &#8372; {item.price.toFixed(2)}
                    </p>
      
                    <p
                      className="item_price--all"
                    >
                      Всього: &#8372; {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </>)
                : (<p
                    className="item_price--pre-order"
                    >
                      Кінцева вартість має бути підтверджена <br />
                      постачальником після замовлення
                  </p>)
              }
            </div>
          </div>
        ))}
      </div>

      {<div
        className="minicart__total"
        style={{
          opacity: productCount === 0 ? '0' : '1'
        }}
      >
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
      </div>}

      <div
        className="minicart__buttons"
        style={{
          opacity: productCount === 0 ? '0' : '1'
        }}
      >
        <Link
          to={'vasilkova_shop_client/cart'}
        >
          <button
            className="minicart__buttons_button"
            onClick={toggleMiniCart}
          >
            ПЕРЕЙТИ ДО КОШИКУ
          </button>
        </Link>
        <Link
          to={'vasilkova_shop_client/checkout'}
        >
          <button
            className="minicart__buttons_button"
            onClick={toggleMiniCart}
          >
            ОФОРМИТИ ЗАМОВЛЕННЯ
          </button>
        </Link>
      </div>
    </div>
  )
}