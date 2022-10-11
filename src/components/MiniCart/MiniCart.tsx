import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../types";

import './MiniCart.scss';

type Props = {
  cart: CartItem[],
  showMiniCart: boolean,
  toggleMiniCart: () => void,
  productCount: number,
  addItem: (id: string) => void,
  removeItem: (id: string) => void,
  removeProduct: (id: string, item: CartItem) => void,
  clearCart: () => void
}

export const MiniCart: React.FC<Props> = ({
  cart,
  showMiniCart,
  productCount,
  toggleMiniCart,
  addItem,
  removeItem,
  removeProduct,
  clearCart
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
        My Cart:&nbsp;
        <span
          className="minicart__contents--itemCount"
        >
          {productCount} {productCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      {productCount === 0 && (
        <h3
          className="minicart--empty"
        >
          YOUR CART IS EMPTY
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
            <p className="item_specs">{item.specs}</p>
            <div className="item_quantity">
              <button
                className="item_quantity--add"
                onClick={(event) => {
                  event.stopPropagation();
                  addItem(item._id);
                }}
              >
                &#43;
              </button>
              <p
                className="item_quantity--total"
              >
                {item.quantity}
              </p>
              <button
                className="item_quantity--subtract"
                onClick={(event) => {
                  event.stopPropagation();
                  removeItem(item._id);
                }}
              >
                &#8722;
              </button>
            </div>
            <div
              className="item_price"
            >
              <p
                className="item_price--one"
              >
                Item: &#8372; {item.price.toFixed(2)}
              </p>

              <p
                className="item_price--all"
              >
                Total: &#8372; {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="minicart__total">
        <span>Total:&nbsp;</span>
        <span>&#8372;&nbsp;
          {cart.map((item: CartItem) => (
            item.quantity * item.price
          )).reduce((total, amount) => total + amount, 0).toFixed(2)}
        </span>
      </div>

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
            VIEW CART
          </button>
        </Link>
        <Link
          to={'vasilkova_shop_client/checkout'}
        >
          <button
            className="minicart__buttons_button"
            onClick={toggleMiniCart}
          >
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  )
}