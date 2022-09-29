import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductGroup, ProductType } from "../../types";

import './Category.scss';

type Props = {
  productTypes: ProductType[],
  productGroups: ProductGroup[],
  setProductTypes: Dispatch<SetStateAction<ProductType[]>>
}

export const Category: React.FC<Props> = ({ productTypes, productGroups, setProductTypes }) => {
  const { categoryName } = useParams();
  useEffect(() => {
    setProductTypes(productGroups.find((productGroup: ProductGroup) => (
      productGroup.name === categoryName))!.types)
  })
  
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
      </p>
      <div className="productTypes">
        {productTypes.map((type: ProductType) => (
          <Link
            key={type.name}
            className="productTypes__item"
            to={`/vasilkova_shop_client/${categoryName!.toLowerCase()}/${type.name}`}
          >
            <div className="productTypes__item_wrapper">
              <img
                className="productTypes__item_wrapper--image"
                src={type.image}
                alt="/"
              />
              <p className="productTypes__item_wrapper--type">
                {type.name.toUpperCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}