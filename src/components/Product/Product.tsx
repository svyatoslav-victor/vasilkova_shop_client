import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductInfo, CartItem } from "../../types";
import classNames from "classnames";

import { ImageView } from "./ImageView/ImageView";

import './Product.scss';

type Props = {
  goodsList: ProductInfo[],
  fillCart: (data: CartItem) => void,
  showImageView: boolean,
  toggleImageView: () => void
}

export const Product: React.FC<Props> = ({
  goodsList,
  fillCart,
  showImageView,
  toggleImageView
 }) => {
  const { categoryName, type, productId } = useParams();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [product, setProduct] = useState<ProductInfo>();
  const [item, setItem] = useState<CartItem>({
    _id: '',
    productId: '',
    name: '',
    brand: '',
    price: 0,
    color: '',
    description: '',
    images: null,
    quantity: 0,
    specs: ''
  });

  const [specs, setSpecs] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setProduct(goodsList.find((good: ProductInfo) => (
      good.productId === productId
    )));
  });

  useEffect(() => {
    product && setItem({
      _id: product._id,
      productId: product.productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      color: product.color,
      description: product.description,
      images: product.images,
      quantity,
      specs
    })
  }, [quantity, specs])

  const handleAddToCart = () => {
    setSpecs('');
    setQuantity(0);
    fillCart(item);
  }

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

      <div
        className="product"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        {product && (
          <div className="product__card">
            <div className="product__card_images_wrapper">
              {!product.inStock && (
                <h5
                  className="product__out-of-stock"
                >
                  AVAILABLE FOR PRE-ORDER
                </h5>
              )}

              <div className={classNames({
                'product_images': product.inStock,
                'product_images--out-of-stock': !product.inStock,
              })}>
                <img
                  className="product_images--main"
                  src={`${process.env.REACT_APP_FILE_STORAGE}${product.images[selectedImage]}`}
                  alt="/"
                  onClick={toggleImageView}
                />

                <div
                  className="product_images--all"
                >
                  {Array.from(product.images).map((image, index) => (
                    <img
                      className="image"
                      key={index}
                      src={`${process.env.REACT_APP_FILE_STORAGE}${image}`}
                      alt="/"
                      onClick={() => setSelectedImage(index)}
                     />
                    ))}
                </div>
              </div>
            </div>

            <div
              className="product__card_content"
            >
              <div className="product__card_content_info">
                <p className="info--name">{product.name}</p>
                
                <div className="info_block">
                  {product.inStock
                    ? (<p className="info_block--price">
                        &#8372; {product.price.toFixed(2)}
                      </p>)
                    : (
                      <p className="info_block--price_pre-order">
                        The final price will be confirmed by
                        the supplier upon order placement
                      </p>
                    )
                  }
                  <div
                    className="info_block--color"
                    style={{
                      backgroundColor: `${product.color}`
                    }}
                  >
                  </div>
                </div>

                <p className="info--description">{product.description}</p>
              </div>

              <div
                className="product__card_content_specs"
              >
                <div
                  className="product__card_content_specs_details"
                >
                  <div
                    className="product__card_content_specs_details_block"
                  >
                    <p className="product__card_content_specs_details_block--help">
                      Please specify desired quantity
                    </p>

                    <input
                      className="product__card_content_specs_details_block--quantity"
                      type="number"
                      min={0}
                      name="quantity"
                      value={quantity}
                      onChange={(event) => {setQuantity(+event.target.value)}}
                    />
                  </div>

                  <div
                    className="product__card_content_specs_details_block"
                  >
                    <p className="product__card_content_specs_details_block--help">
                      Please specify desired size(s) and additional info
                    </p>

                    <textarea
                      className="product__card_content_specs_details_block--addInfo"
                      name="specs"
                      rows={3}
                      cols={35}
                      value={specs}
                      onChange={(event) => {setSpecs(event.target.value)}}
                    >
                    </textarea>
                  </div>
                </div>

                <button
                  className="product__card_content_specs_button"
                  disabled={!quantity || !specs}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? 'ADD TO CART' : 'PRE-ORDER'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showImageView && (
          product && <ImageView
            images={product.images}
            selectedImage={selectedImage}
          />
        )}
      </div>
    </div>
  )
}
