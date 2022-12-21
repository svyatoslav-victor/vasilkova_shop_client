import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductInfo } from "../../types";

import './Home.scss';

type Props = {
  products: ProductInfo[]
}

export const Home: React.FC<Props> = ({ products }) => {
  const [index, setIndex] = useState<number>(0);
  const [touched, setTouched] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState<null | number>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!touched) {
        index === products.length - 1 ? setIndex(0) : setIndex(prevState => prevState + 1)
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  });

  const handleTouchStart = (event: React.TouchEvent) => {
    const firstTouch = event.touches[0].clientX;
    setTouchPosition(firstTouch);
    setTouched(true);
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentPosition = event.touches[0].clientX;
    const diff = touchDown - currentPosition;

    if (diff > 5) {
      index === products.length - 1 ? setIndex(0) : setIndex(prevState => prevState + 1)
    }

    if (diff < -5) {
      index === 0 ? setIndex(products.length - 1) : setIndex(prevState => prevState - 1)
    }

    setTouchPosition(null);
  }

  return (
    <div className="home">
      <h1 className="home__heading">Популярні продукти</h1>
      <div className="home__content">
        <button
          className="home__content_button--back"
          onClick={() => {
            setTouched(true);
            index === 0 ? setIndex(products.length - 1) : setIndex(prevState => prevState - 1)
          }}
        >
          &#10096;
        </button>

        <div
          className="home__content_products"
          style={{
            transform: `translateX(-${index * 100}%)`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {products.map((product: ProductInfo) => (
            <div
              key={product._id}
              className="home__content_products_item"
              style={{
                width: '100%'
              }}
            >
              <div
                className="home__content_products_item_image"
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_FILE_STORAGE}${product.images[0]})`
                }}
              />

              <div
                className="home__content_products_item_details"
              >
                <p
                  className="home__content_products_item_details_name"
                >
                  {product.name}
                </p>

                <Link
                  className="home__content_products_item_details_link"
                  to={`/vasilkova_shop_client/${product.category.split(' ').join('_').toLocaleLowerCase()}/${product.productType.toLocaleLowerCase()}/${product.productId}`}
                >
                  ДІЗНАТИСЬ БІЛЬШЕ
                </Link>
              </div>
            </div>
          ))}
        </div>


        <button
          className="home__content_button--forward"
          onClick={() => {
            setTouched(true)
            index === products.length - 1 ? setIndex(0) : setIndex(prevState => prevState + 1)
          }}
        >
            &#10097;
        </button>
      </div>
    </div>
  )
}
