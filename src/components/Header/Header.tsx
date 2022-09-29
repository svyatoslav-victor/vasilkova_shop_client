import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ProductGroup, ProductInfo, Color, Brand } from '../../types';
import { productColors, productBrands } from '../../productInfo';

import logo from '../../shop_icons/engineer-worker-svgrepo-com.svg'
import cartIcon from '../../shop_icons/cart-svgrepo-com.svg';
import cartIconFull from '../../shop_icons/cart-full-svgrepo-com.svg';
import searchIcon from '../../shop_icons/magnifying-glass-svgrepo-com.svg';
import phone from '../../shop_icons/smartphone-svgrepo-com.svg';
import filter from '../../shop_icons/filter-svgrepo-com.svg';

import './Header.scss'

type Props = {
  productGroups: ProductGroup[],
  categoryName: string,
  setCategoryName: Dispatch<SetStateAction<string>>,
  areTypesVisible: boolean,
  setAreTypesVisible: Dispatch<SetStateAction<boolean>>,
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  products: ProductInfo[],
  previewSearch: ProductInfo[],
  filteredProducts: ProductInfo[],
  setFilteredProducts: Dispatch<SetStateAction<ProductInfo[]>>,
  dynamicQuery: string,
  setDynamicQuery: Dispatch<SetStateAction<string>>,
  goToSearch: () => void,
  productCount: number,
  toggleMiniCart: () => void
}

type Filter = {
  tags: {
    [key: string]: {
      [key: string]: boolean
    }
  }
}

type SelectedKeys = {
  [key: string]: string[]
}

const initialFilters = {
  tags: {
    price: {
      'lowToHigh': false,
      'highToLow': false
    },
    brand: {
      'Nitras': false,
      'Uvex': false
    },
    color: {
      '#000000': false,
      '#ffffff': false,
      '#bf0909': false,
      '#0000e5': false,
      '#00006a': false,
      '#573313': false,
      '#dbdbb3': false,
      '#faecbe': false,
      '#808080': false,
      '#575757': false,
      '#bdbdbd': false,
      '#1e6f1e': false,
      '#1c571c': false,
      '#253b11': false,
      '#7bff00': false,
      '#ff4600': false
    },
    keywords: {
      'all': false,
      'winter': false
    }
  }
}

export const Header: React.FC<Props> = ({
  categoryName,
  productGroups,
  setCategoryName,
  areTypesVisible,
  setAreTypesVisible,
  query,
  setQuery,
  products,
  previewSearch,
  filteredProducts,
  setFilteredProducts,
  dynamicQuery,
  setDynamicQuery,
  goToSearch,
  productCount,
  toggleMiniCart
}) => {
  const [displayFilters, setDisplayFilters] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter>(initialFilters);

  const navigate = useNavigate();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setDynamicQuery(event.target.value);
    setHasLoaded(false);
    setTimeout(() => {
      setHasLoaded(true);
    }, 1000);
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  const handleSort = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement) {
      const sortOrder = event.target.dataset.sortorder;
      if (sortOrder === 'lowToHigh') {
        setFilters((prevState: Filter) => ({
          tags: {
            ...prevState.tags,
            price: {
              lowToHigh: true,
              highToLow: false
            }
          }
        }))
      }

      if (sortOrder === 'highToLow') {
        setFilters((prevState: Filter) => ({
          tags: {
            ...prevState.tags,
            price: {
              lowToHigh: false,
              highToLow: true
            }
          }
        }))
      }
    }
  }

  const handleFilterChange = (event: React.MouseEvent<HTMLElement>, filter: string) => {
    if (event.target instanceof HTMLElement) {
      const name = event.target.dataset.name;
      if (name) {
        setFilters((prevState: Filter) => ({
          tags: {
            ...prevState.tags,
            [filter]: {
              ...prevState.tags[filter],
              [name]: !prevState.tags[filter][name]
            }
          }
        }))
      }
    }
  }

  const filterSelectedTags = () => {
    const selectedKeys: SelectedKeys = {
      brand: [],
      color: [],
      keywords: []
    };

    const { brand, color, keywords } = filters.tags;

    for (let brandItem in brand) {
      if (brand[brandItem]) {
        selectedKeys.brand.push(brandItem)
      }
    }

    for (let colorItem in color) {
      if (color[colorItem]) {
        selectedKeys.color.push(colorItem)
      }
    }

    for (let keywordsItem in keywords) {
      if (keywords[keywordsItem]) {
        selectedKeys.keywords.push(keywordsItem)
      }
    }

    return selectedKeys;
  }

  const multiFilter = (productArray: ProductInfo[], filters: SelectedKeys) => {
    const selectedTagKeys = Object.keys(filters);

    return productArray.filter((product: ProductInfo) => {
      return selectedTagKeys.every((key: string) => {
        if (!filters[key].length) {
          return true
        }

        if (Array.isArray(product[key as keyof typeof product])) {
          return product.keywords.some((item: string) => filters[key].includes(item))
        }
        // check this line with other filters 
        return filters[key].includes(product[key as keyof typeof product].toString())
      })
    })
  }

  const goToFilter = () => {
    navigate({
      pathname: '/vasilkova_shop_client/search_results',
    });
    setDisplayFilters(false);
  }

  const filterProducts = () => {
    const result = multiFilter(products, filterSelectedTags());
    if (filters.tags.price.lowToHigh) {
      result.sort((low: ProductInfo, high: ProductInfo) => {
        return low.price < high.price ? -1 : 1
      })
    }

    if (filters.tags.price.highToLow) {
      result.sort((low: ProductInfo, high: ProductInfo) => {
        return low.price < high.price ? 1 : -1
      })
    }

    setFilteredProducts(result)
  }

  useEffect(() => {
    filterProducts()
  }, [filters])

  return (
    <div className='header'>
      <div className='header__main'>
        <div
          className='header__main_logo'
        >
          <Link
            to={'/vasilkova_shop_client'}
            onClick={()=> setQuery('')}
          >
            <img src={logo} alt="/" />
          </Link>
        </div>

        <div
          className='header__main_search'
        >
          <input
            className='header__main_search--searchBar'
            type="search"
            value={query}
            placeholder='Find product'
            onChange={handleQueryChange}
            onKeyDown={(event) => {
              event.key === 'Enter' && goToSearch();
            }}
          />

          <button
            className='header__main_search--searchButton'
            type='submit'
            onClick={goToSearch}
            >
              <img
                className='header__main_search--searchButton--icon'
                src={searchIcon}
                alt="/"
              />
          </button>

          <div
            className='header__main_search--preview'
          >
            {dynamicQuery.length === 0
              ? null
              : (
                previewSearch.length > 0
                  ? (
                    previewSearch.map((item: ProductInfo) => (
                      <div
                        key={item.productId}
                        className='header__main_search--preview_link'
                        onClick={() => {
                          navigate({
                            pathname: `/vasilkova_shop_client/${item.category.toLocaleLowerCase()}/${item.productType.toLocaleLowerCase()}/${item.productId}`,
                          })
                          setDynamicQuery('')
                        }}
                      >
                        <div
                          style={{
                            width: '3em',
                            height: '3em'
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_FILE_STORAGE}${item.images![0]}`} alt="/"
                            style={{
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </div>
                        <div>{item.name}</div>
                      </div>
                    ))
                  )
                  : <div>{hasLoaded ? 'No match :(' : 'Searching...'}</div>
              )
            }
          </div>
        </div>

        <div
          className='header__main_phones'
        >
          <div className='header__main_phones_numbers'>
            <a
              href="tel:+380933638593"
              className='header__main_phones_numbers--number'
            >
              +38 093 363 85 93
            </a>

            <a
              href="tel:+380504932903"
              className='header__main_phones_numbers--number'
            >
              +38 050 493 29 03
            </a>
          </div>

          <div
            className='header__main_phones_icon'
            style={{
              backgroundImage: `url(${phone})`
            }}
          >
          </div>
        </div>
      </div>

      <div
        className='header__nav'
        onMouseLeave={() => {
          setCategoryName('')
          setAreTypesVisible(false)
        }}
      >
        <ul
          className='header__nav_categories'
        >
          <div
            className='header__nav_categories_filter'
            onMouseEnter={() => setDisplayFilters(true)}
            onMouseLeave={() => setDisplayFilters(false)}
          >
            <img
              className='header__nav_categories_filter--image'
              src={filter}
              alt="/"
            />
            <div
              className='header__nav_categories_filter--filterList'
              style={{
                visibility: displayFilters ? 'visible' : 'collapse'
              }}
            >
              <div className='filters__container'>
                <div className="filters__container_group">
                  <p
                    className='filters__container_group_name'
                  >
                    Price
                  </p>

                  <div
                    className="filters__container_group_items"
                  >
                    <div
                      className="filters__container_group_items--item"
                      data-sortorder='lowToHigh'
                      style={{
                        backgroundColor: filters.tags.price.lowToHigh ? 'gray' : 'white',
                        outline: filters.tags.price.lowToHigh ? '3px double yellow' : '1px solid blue'
                      }}
                      onClick={handleSort}
                    >
                      <p
                        className='filters__container_group_items--item_name'
                        data-sortorder='lowToHigh'
                      >
                        Low &#8921; High
                      </p>
                    </div>

                    <div
                      className="filters__container_group_items--item"
                      data-sortorder='highToLow'
                      style={{
                        backgroundColor: filters.tags.price.highToLow ? 'gray' : 'white',
                        outline: filters.tags.price.highToLow ? '3px double yellow' : '1px solid blue'
                      }}
                      onClick={handleSort}
                    >
                      <p
                        className='filters__container_group_items--item_name'
                        data-sortorder='highToLow'
                      >
                        High &#8921; Low
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='filters__container_group'
                >
                  <p
                    className='filters__container_group_name'
                  >
                    Brands
                  </p>
                  <div
                    className='filters__container_group_items'
                  >
                    {productBrands.map((brand: Brand) => (
                      <div
                        className='filters__container_group_items--item'
                        data-name={brand.value}
                        key={brand.value}
                        style={{
                          outline: filters.tags.brand[brand.value] ? '3px double yellow' : '1px solid blue'
                        }}
                        onClick={(event) => {handleFilterChange(event, 'brand')}}
                      >
                        <p
                          className='filters__container_group_items--item_name'
                          data-name={brand.value}
                        >
                          {brand.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='filters__container_group'>
                  <p
                    className='filters__container_group_name'
                  >
                    Colors
                  </p>
                  <div
                    className='filters__container_group_items'
                  >
                    {productColors.map((color: Color) => (
                      <div
                        className='filters__container_group_items--item'
                        key={color.hex}
                        data-name={color.hex}
                        style={{
                          background: `${color.hex}`,
                          outline: filters.tags.color[color.hex] ? '3px double yellow' : '1px solid blue'
                        }}
                        onClick={(event) => {handleFilterChange(event, 'color')}}
                      >
                        <p
                          className='filters__container_group_items--item_name'
                          data-name={color.hex}
                          style={{
                            color: `${color.hex === '#000000' 
                              || color.hex ===  '#bf0909'
                              || color.hex === '#0000e5'
                              || color.hex === '#00006a'
                              || color.hex === '#573313'
                              || color.hex === '#575757'
                              || color.hex === '#bdbdbd'
                              || color.hex === '#1e6f1e'
                              || color.hex === '#1c571c'
                              || color.hex === '#253b11'
                                ? 'white'
                                : 'black'
                            }`
                          }}
                        >
                          {color.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className='filters__container_group'
                >
                  <p
                    className='filters__container_group_name'
                  >
                    Winter Items
                  </p>
                  <div
                    className='filters__container_group_items'
                  >
                    <div
                      className='filters__container_group_items--item'
                      data-name='winter'
                      style={{
                        outline: filters.tags.keywords.winter ? '3px double yellow' : '1px solid blue'
                      }}
                      onClick={(event) => {handleFilterChange(event, 'keywords')}}
                    >
                      <p
                        className='filters__container_group_items--item_name'
                        data-name='winter'
                      >
                        Winter
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='filters__buttons'>
                <button
                  className='filters__buttons_button'
                  onClick={goToFilter}
                >
                  Filter ({filteredProducts.length})
                </button>

                <button
                  className='filters__buttons_button'
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          {productGroups.map(category => (
            <li
              className='header__nav_categories--item'
              key={category.name}
              onClick={() => setCategoryName(category.name)}
              onMouseEnter={() => {
                setCategoryName(category.name)
                setAreTypesVisible(true)
              }}
            >
              <NavLink
                className="header__nav_categories--navLink"
                to={`/vasilkova_shop_client/${category.name.toLowerCase()}`}
              >
                {category.name.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          className='header__nav_miniCart'
        >
          <span
            className='header__nav_miniCart--count'
          >
            {productCount}
          </span>
          
          <div
            className='header__nav_miniCart_cart'
            onClick={toggleMiniCart}
          >
            <img
              className='header__nav_miniCart_cart--icon'
              src={productCount === 0 ? cartIcon : cartIconFull}
              alt="/"
            />
          </div>
        </div>

        <ul
          className='header__nav_types'
          style={{
            visibility: areTypesVisible ? 'visible' : 'collapse'
          }}
          onMouseLeave={() => {
            setCategoryName('')
            setAreTypesVisible(false)
          }}
        >
          {productGroups.map(types => (
            types.name === categoryName && (
              types!.types!.map(type => (
                <li
                  key={type.name}
                  onClick={() => setCategoryName('')}
                >
                  <NavLink
                    className="header__nav_types--navLink"
                    to={`/vasilkova_shop_client/${categoryName.toLowerCase()}/${type.name.toLowerCase()}`}
                  >
                    {type.name.toUpperCase()}
                  </NavLink>
                </li>
              ))
            )
          ))}
        </ul>
      </div>
    </div>
  )
}
