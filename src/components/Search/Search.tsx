import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { ProductInfo } from "../../types";
import classNames from "classnames";

import './Search.scss';

type Props = {
  products: ProductInfo[],
  setProduct: Dispatch<SetStateAction<string>>
}

export const Search: React.FC<Props> = ({ products, setProduct }) => {
  return (
    <div>
      <div className="search">
        <h3
          className="search__heading"
        >
          Search results: {products.length}
        </h3>
      </div>

      {products.length === 0
        ? (<div className="goodsList__null">
            <h1 className="goodsList__null_heading">No matching results found :(</h1>
          </div>)
        : (<div className="goodsList goodsList__search">
            {products.map((product: ProductInfo) => (
              <Link
                className="goodsList__item"
                key={product.productId}
                to={`/vasilkova_shop_client/${product.category.toLocaleLowerCase()}/${product.productType.toLocaleLowerCase()}/${product.productId}`}
                onClick={() => {
                  setProduct(products.find((good: ProductInfo) => (
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
                      OUT OF STOCK
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
                  <p
                    className="goodsList__item_price"
                  >
                    &#8372; {product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>)
      }
    </div>
  )
}
