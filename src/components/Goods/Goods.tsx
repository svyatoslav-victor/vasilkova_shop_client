import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductInfo } from "../../types";
import classNames from "classnames";

import './Goods.scss'
import { NoProducts } from "../NoProducts/NoProducts";

type Props = {
  goodsList: ProductInfo[],
  setProduct: Dispatch<SetStateAction<string>>
}

export const Goods: React.FC<Props> = ({
    goodsList,
    setProduct,
  }) => {
  const { categoryName, type } = useParams();

  return (
    <div className="main">
      {type && categoryName && (<p className="links">
        <Link
          className="links__navLink"
          to={'/vasilkova_shop_client'}
        >
          Home
        </Link>
        &nbsp; &#62; &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName.toLowerCase()}`}
        >
          {categoryName}
        </Link>
        &nbsp; &#62; &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName.toLowerCase()}/${type}`}
        >
          {type.split('_').join(' ')}
        </Link>
      </p>)}

      {goodsList.length > 0
        ? (
          <div className="goodsList">
            {goodsList.map((product: ProductInfo) => (
              product.productType.split(' ').join('_').toLowerCase() === type &&
                <Link
                  key={product.productId}
                  className="goodsList__item"
                  to={`/vasilkova_shop_client/${categoryName}/${type}/${product.productId}`}
                  onClick={() => {
                    setProduct(goodsList.find((good: ProductInfo) => (
                      good.productId === product.productId
                    ))!.productId)
                  }}
                >
                  <div
                    className="goodsList__item_wrapper"
                  >
                    {!product.inStock && (
                      <h5
                        className="goodsList__item--out-of-stock"
                      >
                        AVAILABLE FOR PRE-ORDER
                      </h5>
                    )}

                    <div
                      className={classNames({
                        'goodsList__item_image': product.inStock,
                        'goodsList__item_image--out-of-stock': !product.inStock,
                      })}
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_FILE_STORAGE}${product.images[0]})`
                      }}
                    >
                    </div>
                    <p
                      className="goodsList__item_name"
                    >
                      {product.name}
                    </p>
                    {product.inStock
                      ? (<p
                          className="goodsList__item_price"
                        >
                          &#8372; {product.price.toFixed(2)}
                        </p>)
                      : (
                        <p
                          className="goodsList__item_price--pre-order"
                        >
                          The final price will be confirmed by <br />
                          the supplier upon order placement
                        </p>
                      )
                    }
                  </div>
                </Link>
              )
            )}
          </div>
        )
        : <NoProducts />
      }
    </div>
  )
}
