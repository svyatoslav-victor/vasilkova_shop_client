import React from "react";

import addToStock from '../../shop_icons/standing-desk-work-do-programmer-svgrepo-com.svg';

import './NoProducts.scss';

export const NoProducts: React.FC = () => {
  return (
    <div className="noProducts">
      <p className="noProducts__message">
        Unfortunately, there are currently no products in this category :(
      </p>
      <p className="noProducts__message">
        But we are constantly expanding our stock, so please keep visiting our store!
      </p>
      <img
        className="noProducts__image"
        src={addToStock}
      />
    </div>
  )
}