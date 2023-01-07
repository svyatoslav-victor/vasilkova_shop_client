import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

import './Pagination.scss';

type Props = {
  pages: number[],
  pagesToDisplay: number,
  page: number,
  nextPage: () => void,
  previousPage: () => void,
  onPageChange: (current: number) => void,
  selectPage: boolean,
  setSelectPage: Dispatch<SetStateAction<boolean>>,
  searchParams: URLSearchParams
}

export const Pagination: React.FC<Props> = ({
  pages,
  pagesToDisplay,
  page,
  nextPage,
  previousPage,
  onPageChange,
  selectPage,
  setSelectPage,
  searchParams
}) => {
  const navigate = useNavigate();
  const [chosenPage, setChosenPage] = useState<number>(0);

  const handlePageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = event.target;

    value = Math.max(+min, Math.min(Number(max), Number(value))).toString();
    setChosenPage(+value);
  }

  const confirmPageSelection = () => {
    onPageChange(chosenPage)
    setChosenPage(0)
    setSelectPage(false)
    navigate({
      pathname: `/vasilkova_shop_client/search_results/${chosenPage}`,
      search: searchParams.toString()
    })
  }

  return (
    <div className="pagination">
      <div
        className="pagination__selectPage"
        style={{
          transform: selectPage ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
          transition: 'transform 0.3s ease-in-out'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          className="pagination__selectPage--input"
          type="number"
          value={chosenPage || ''}
          min='1'
          max={pages.length + 2}
          placeholder="номер сторінки"
          onChange={handlePageSelection}
          onKeyDown={(event) => {
            event.key === 'Enter' && confirmPageSelection()
          }}
        />
        <button
          className="pagination__selectPage--button"
          onClick={confirmPageSelection}
          disabled={chosenPage === 0}
        >
          ПЕРЕЙТИ
        </button>
      </div>

      <ul className="pagination__list">
        <li
          className="pagination__list_page"
        >
          <button
            className="pagination__list_page--link first"
            type="button"
            disabled={page === 1}
            onClick={() => {
              onPageChange(1)
              navigate({
                pathname: `/vasilkova_shop_client/search_results/${1}`,
                search: searchParams.toString()
              })
            }}
          >
            &laquo;
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className="pagination__list_page--link previous"
            type="button"
            disabled={page === 1}
            onClick={() => {
              previousPage()
              navigate({
                pathname: `/vasilkova_shop_client/search_results/${page - 1}`,
                search: searchParams.toString()
              })
            }}
          >
            &lsaquo;
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className={classNames('pagination__list_page--link', {
              current: page === 1,
            })}
            type="button"
            onClick={() => {
              onPageChange(1)
              navigate({
                pathname: `/vasilkova_shop_client/search_results/${1}`,
                search: searchParams.toString()
              })
            }}
          >
            1
          </button>
        </li>

        <li
          className="pagination__list_page"
          hidden={page < 4}
        >
          <button
            className={classNames('pagination__list_page--link hidden--previous', {
              selector: selectPage
            })}
            type="button"
            onClick={() => setSelectPage(prevState => !prevState)}
          >
            ...
          </button>
        </li>

        {pages.map(item => (
          <li
            key={item}
            className="pagination__list_page"
            hidden={item < page - 2 || item > page}
          >
            <button
              className={classNames('pagination__list_page--link', {
                current: page === item + 1,
              })}
              type="button"
              onClick={() => {
                onPageChange(item + 1)
                navigate({
                  pathname: `/vasilkova_shop_client/search_results/${item + 1}`,
                  search: searchParams.toString()
                })
              }}
            >
              {item + 1}
            </button>
          </li>
        ))}

        <li
          className="pagination__list_page"
          hidden={page >= pagesToDisplay - 2}
        >
          <button
            className={classNames('pagination__list_page--link hidden--next', {
              selector: selectPage
            })}
            type="button"
            onClick={() => setSelectPage(prevState => !prevState)}
          >
            ...
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className={classNames('pagination__list_page--link', {
              current: page === pagesToDisplay,
            })}
            type="button"
            onClick={() => {
              onPageChange(pagesToDisplay)
              navigate({
                pathname: `/vasilkova_shop_client/search_results/${pagesToDisplay}`,
                search: searchParams.toString()
              })
            }}
          >
            {pagesToDisplay}
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className="pagination__list_page--link next"
            type="button"
            disabled={page === pagesToDisplay}
            onClick={() => {
              nextPage()
              navigate({
                pathname: `/vasilkova_shop_client/search_results/${page + 1}`,
                search: searchParams.toString()
              })
            }}
          >
            &rsaquo;
          </button>
        </li>

          <li
            className="pagination__list_page"
          >
            <button
              className="pagination__list_page--link last"
              type="button"
              disabled={page === pagesToDisplay}
              onClick={() => {
                onPageChange(pagesToDisplay)
                navigate({
                  pathname: `/vasilkova_shop_client/search_results/${pagesToDisplay}`,
                  search: searchParams.toString()
                })
              }}
            >
              &raquo;
            </button>
          </li>
        </ul>
    </div>
  )
}
