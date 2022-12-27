import React from "react";

import addToStock from '../../shop_icons/standing-desk-work-do-programmer-svgrepo-com.svg';

import './NoProducts.scss';

export const NoProducts: React.FC = () => {
  return (
    <div className="noProducts">
      <p className="noProducts__message">
        На жаль, поки що в цій категорії продуктів нема :(
      </p>
      <p className="noProducts__message">
        Але ми постійно розширюємо ассортимент, тож приходьте ще!
      </p>
      <img
        className="noProducts__image"
        src={addToStock}
      />
    </div>
  )
}