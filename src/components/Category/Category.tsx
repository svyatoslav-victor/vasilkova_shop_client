import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { NoSection } from "../NoSection/NoSection";
import { ProductGroup, ProductType } from "../../types";

import './Category.scss';

type Props = {
  productTypes: ProductType[],
  productGroups: ProductGroup[],
  setProductTypes: Dispatch<SetStateAction<ProductType[]>>,
  isMobile: number
}

export const Category: React.FC<Props> = ({
  productTypes,
  productGroups,
  setProductTypes,
  isMobile
}) => {
  const { categoryName } = useParams();

  useEffect(() => {
    setProductTypes(productGroups.find((productGroup: ProductGroup) => (
      productGroup.name === categoryName))!.types)
  }, [categoryName])

  return (
    <div className="main">
      <p className="links">
        <Link
          className="links__navLink"
          to={'/vasilkova_shop_client'}
        >
          Додому
        </Link>
        &nbsp; / &nbsp;
        <Link
          className="links__navLink"
          to={`/vasilkova_shop_client/${categoryName!.toLowerCase()}`}
          style={{
            color: 'rgb(0, 139, 146)'
          }}
        >
          {isMobile > 600
            ? productGroups.find((group: ProductGroup) => (
                group.name === categoryName ? group.nameUA : ''
              ))!.nameUA
            : categoryName === 'ppe'
                ? productGroups.find((group: ProductGroup) => (
                    group.name === categoryName ? group.nameUA : ''
                  ))!.nameUA.split(' ').map((word: string) => word[0]).join('')
                : productGroups.find((group: ProductGroup) => (
                  group.name === categoryName ? group.nameUA : ''
                ))!.nameUA
          }
        </Link>
      </p>

      {productTypes.length > 0
        ? (
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
                    {type.nameUA.split('_').join(' ').toUpperCase()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )
        : <NoSection />
      }
    </div>
  )
}