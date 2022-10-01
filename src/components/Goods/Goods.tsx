import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductInfo, ProductGroup, ProductType } from "../../types";
import classNames from "classnames";

import './Goods.scss'
import { NoProducts } from "../NoProducts/NoProducts";

type Props = {
  goodsList: ProductInfo[],
  productGroups: ProductGroup[],
  setProductTypes: Dispatch<SetStateAction<ProductType[]>>,
  setProduct: Dispatch<SetStateAction<string>>
}

export const Goods: React.FC<Props> = ({
    goodsList,
    productGroups,
    setProductTypes,
    setProduct
  }) => {
  const { categoryName, type } = useParams();
  const [goods, setGoods] = useState<ProductInfo[]>([])

  useEffect(() => {
    setProductTypes(productGroups.find((productGroup: ProductGroup) => (
      productGroup.name === categoryName))!.types)

    setGoods(goodsList.filter((good: ProductInfo) => good.productType.toLowerCase() === type))
  }, [type])

  return (
    <div className="main">
      <p className="links">
        <Link
          className="links__navLink"
          to={'/vasilkova_shop_client'}
        >
          Home
        </Link>
        &nbsp; &#62; &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName!.toLowerCase()}`}
        >
          {categoryName}
        </Link>
        &nbsp; &#62; &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName!.toLowerCase()}/${type}`}
        >
          {type}
        </Link>
      </p>

      {goods.length > 0
        ? (
          <div className="goodsList">
            {goods.map((product: ProductInfo) => (
              product.productType.toLowerCase() === type &&
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
              )
            )}
          </div>
        )
        : <NoProducts />
      }
    </div>
  )
}