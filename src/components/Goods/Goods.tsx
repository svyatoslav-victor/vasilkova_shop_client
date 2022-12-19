import React, { Dispatch, SetStateAction } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductGroup, ProductType, ProductInfo } from "../../types";
import { productGroups } from "../../productInfo";
import classNames from "classnames";

import './Goods.scss'
import { NoProducts } from "../NoProducts/NoProducts";

type Props = {
  goodsList: ProductInfo[],
  setProduct: Dispatch<SetStateAction<string>>
}

export const Goods: React.FC<Props> = ({
    goodsList,
    setProduct
  }) => {
  const { categoryName, type } = useParams();

  return (
    <div className="main">
      {type && categoryName && (<p className="links">
        <Link
          className="links__navLink"
          to={'/vasilkova_shop_client'}
        >
          Додому
        </Link>
        &nbsp; / &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName.toLowerCase()}`}
        >
          {productGroups.find((group: ProductGroup) => (
            group.name === categoryName ? group.nameUA : ''
          ))!.nameUA}
        </Link>
        &nbsp; / &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName.toLowerCase()}/${type}`}
          style={{
            color: 'rgb(0, 139, 146)'
          }}
        >
          {productGroups.find((group: ProductGroup) => (
            group.name === categoryName && group.nameUA
          ))!.types.find((productType: ProductType) => (
            productType.name === type && productType.nameUA
          ))!.nameUA}
        </Link>
      </p>)}

      {goodsList.length > 0
        ? (
          <div className="goodsList">
            {goodsList.map((product: ProductInfo) => (
              product.productType.split(' ').join('_').toLowerCase() === type && // check categories & types in database!!!
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
                        ДОСТУПНО ЗА ЗАМОВЛЕННЯМ
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
                          Кінцева вартість має бути підтверджена <br />
                          постачальником після замовлення
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
