import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { ProductInfo, Paginator } from "../../types";
import classNames from "classnames";

import './Search.scss';

type Props = {
  products: ProductInfo[],
  setProduct: Dispatch<SetStateAction<string>>,
  paginationParams: Paginator,
  setPaginationParams: Dispatch<SetStateAction<Paginator>>,
  searchParams: URLSearchParams,
  nextPage: () => void,
  previousPage: () => void,
  onPageChange: (current: number) => void,
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  selectPage: boolean,
  setSelectPage: Dispatch<SetStateAction<boolean>>
}

export const Search: React.FC<Props> = ({
  products,
  setProduct,
  paginationParams,
  setPaginationParams,
  searchParams,
  nextPage,
  previousPage,
  onPageChange,
  onPerPageChange,
  selectPage,
  setSelectPage
}) => {
  const { currentPage } = useParams();
  const navigate = useNavigate();
  const { total, perPage, page } = paginationParams;
  const pagesToDisplay = Math.ceil(products.length / perPage);

  const pages = Array.from({ length: pagesToDisplay - 2 }, (_, i) => i + 1);
  const [productsToDisplay, setProductsToDisplay] = useState<ProductInfo[]>([]);

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      total: products.length,
    })
  }, [products])

  useEffect(() => {
    const newProducts: ProductInfo[] = [];

    for (let i = 0; i < products.length; i++) {
      if (currentPage) {
        if (Math.floor(i / perPage) === +currentPage - 1) {
          newProducts.push(products[i])
        }
      }
    }
    
    setProductsToDisplay(newProducts);
  }, [products, perPage, page])

  useEffect(() => {
    localStorage.setItem('perPage', paginationParams.perPage.toString())
  }, [perPage])

  return (
    <div className="main">
      {products.length > 0 && (
        <div className="search">
          <h3
            className="search__heading"
          >
            Результати:&nbsp;
            {currentPage && ` ${perPage * (+currentPage - 1) + 1}
              - ${+currentPage === pagesToDisplay ? total : (+currentPage - 1) * perPage + perPage}
              з ${total}`
            }
          </h3>

          <div className="search__pageSelector">
            <label className="search__pageSelector_label">
              Відображати по:

              <select
                className="search__pageSelector_label_selector"
                onChange={(event) => {
                  onPerPageChange(event);
                  navigate({
                    pathname: `/vasilkova_shop_client/search_results/1`,
                  }, { replace: true })
                }}
              >
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value={total}>Всі товари</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {products.length === 0
        ? (<div className="goodsList__null">
            <h1 className="goodsList__null_heading">Нічого не знайдено :(</h1>
          </div>)
        : (<div className="goodsList goodsList__search">
            {productsToDisplay.map((product: ProductInfo) => (
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
                    ? (<p className="goodsList__item_price">
                        &#8372; {product.price.toFixed(2)}
                      </p>)
                    : (
                      <p className="goodsList__item_price--pre-order">
                        Кінцева вартість має бути підтверджена
                        постачальником після замовлення
                      </p>
                    )
                  }
                </div>
              </Link>
            ))}
          </div>)
      }

        {pagesToDisplay > 1 && <Pagination
          pages={pages}
          pagesToDisplay={pagesToDisplay}
          page={page}
          onPageChange={onPageChange}
          nextPage={nextPage}
          previousPage={previousPage}
          selectPage={selectPage}
          setSelectPage={setSelectPage}
          searchParams={searchParams}
        />}
    </div>
  )
}
