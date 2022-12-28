import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ProductGroup, ProductInfo, Color, Brand, ProductType, Paginator } from '../../types';
import { productColors, productBrands } from '../../productInfo';
import classNames from 'classnames';

import logo from '../../shop_icons/engineer-worker-svgrepo-com.svg'
import cartIcon from '../../shop_icons/cart-svgrepo-com.svg';
import cartIconFull from '../../shop_icons/cart-full-svgrepo-com.svg';
import searchIcon from '../../shop_icons/magnifying-glass-svgrepo-com.svg';
import phone from '../../shop_icons/smartphone-svgrepo-com.svg';
import filter from '../../shop_icons/filter-alt-svgrepo-com.svg';
import menuClosed from '../../shop_icons/menu-closed-svgrepo-com.svg';
import menuOpen from '../../shop_icons/menu-open-svgrepo-com.svg';
import location from '../../shop_icons/location.svg';
import email from '../../shop_icons/email.svg';
import web from '../../shop_icons/web-svgrepo-com.svg';

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
  showFilters: boolean,
  showMenu: boolean,
  setShowFilters: Dispatch<SetStateAction<boolean>>,
  toggleFilters: () => void,
  toggleMenu: () => void,
  toggleMiniCart: () => void,
  isMobile: number,
  paginationParams: Paginator
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
    productType: {
      'jackets': false,
      'pants': false,
      'coveralls': false,
      'overalls': false,
      't-shirts': false,
      'high_visibility_clothing': false,
      'low_shoes': false,
      'boots': false,
      'high_boots': false,
      'sandals': false,
      'head_and_face_protection': false,
      'respiratory_protection': false,
      'visual_protection': false,
      'hearing_protection': false,
      'hand_protection': false,
      'high-altitude_work_equipment': false
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

const initialOptions = {
  brands: false,
  clothing: false,
  shoes: false,
  ppe: false,
  colors: false,
  winter: false
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
  showFilters,
  showMenu,
  setShowFilters,
  toggleFilters,
  toggleMenu,
  toggleMiniCart,
  isMobile,
  paginationParams,
}) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter>(initialFilters);
  const [displayFilterOptions, setDisplayFilterOptions] = useState<Record<string, boolean>>(initialOptions);
  const { page } = paginationParams;

  const navigate = useNavigate();

  useEffect(() => {
    if (!areTypesVisible) {
      setCategoryName('')
    }
  }, [areTypesVisible]);

  const toggleFilterOptions = (event: React.MouseEvent<HTMLElement>) => {
    let target = event.target as HTMLElement
    setDisplayFilterOptions(prevState => ({
      ...prevState,
      [target.id]: !prevState[target.id]
    }))
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLocaleLowerCase());
    setDynamicQuery(event.target.value.toLocaleLowerCase());
    setHasLoaded(false);
    setTimeout(() => {
      setHasLoaded(true);
    }, 1000);
  }

  const resetFilters = () => {
    setFilters(initialFilters)
    setDisplayFilterOptions(initialOptions)
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
      productType: [],
      color: [],
      keywords: []
    };

    const { brand, productType, color, keywords } = filters.tags;

    for (let brandItem in brand) {
      if (brand[brandItem]) {
        selectedKeys.brand.push(brandItem.toLowerCase())
      }
    }

    for (let productTypeItem in productType) {
      if (productType[productTypeItem]) {
        selectedKeys.productType.push(productTypeItem.split('_').join(' '))
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
        return filters[key].includes(product[key as keyof typeof product].toString().toLowerCase())
      })
    })
  }

  const goToFilter = () => {
    navigate({
      pathname: `/vasilkova_shop_client/search_results/${page}`,
    });
    setShowFilters(false);
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
    <>
      <div
        className='menu__mobile'
        style={{
          width: isMobile < 1024 && isMobile > 760 ? "50vw" : isMobile <= 360 ? "100vw" : '90vw',
          left: showMenu ? "0" : "-100vw",
          opacity: showMenu ? "1" : "0"
        }}
        onClick={(event) => {
          event.stopPropagation()
          showFilters && toggleFilters()
        }}
      >
        <div
          className='menu__mobile_heading'
        >
          <div
            className='menu__mobile_heading_logo'
          >
            <Link
              to={'/vasilkova_shop_client'}
              onClick={()=> {
                setQuery('')
                toggleMenu()
              }}
            >
              <img src={logo} alt="/" />
            </Link>
          </div>

          <div className='menu__mobile_heading_menu'
            onClick={toggleMenu}
          >
            <img
              className='menu__mobile_heading_menu--icon'
              src={menuOpen}
              alt="/"
              style={{
                width: '1.5em',
              }}
            />
          </div>
        </div>

        <div className='menu__mobile_nav'>
          <div
            className='menu__mobile_nav_filters'
            onClick={toggleFilters}
          >
            <img
              className='menu__mobile_nav_filters--icon'
              src={filter}
              alt="/"
              style={{
                transform: showFilters ? 'rotate(-90deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease-in-out'
              }}
            />

            <div
              className='menu__mobile_nav_filters_list'
              style={{
                transform: showFilters ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transition: 'transform 0.3s ease-in-out'
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className='mobile__filters_container'>
                <div className="mobile__filters_container_group">
                  <p
                    className='mobile__filters_container_group_name'
                  >
                    Ціна
                  </p>

                  <div
                    className="mobile__filters_container_group_items"
                  >
                    <div
                      className="mobile__filters_container_group_items--item"
                      data-sortorder='lowToHigh'
                      onClick={handleSort}
                    >
                      <p
                        className='mobile__filters_container_group_items--item_name'
                        data-sortorder='lowToHigh'
                        style={{
                          color: filters.tags.price.lowToHigh ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        За зростанням
                      </p>
                    </div>

                    <div
                      className="mobile__filters_container_group_items--item"
                      data-sortorder='highToLow'
                      onClick={handleSort}
                    >
                      <p
                        className='mobile__filters_container_group_items--item_name'
                        data-sortorder='highToLow'
                        style={{
                          color: filters.tags.price.highToLow ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        За спаданням
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='mobile__filters_container_group'
                >
                  <p
                    className='mobile__filters_container_group_name'
                    style={{
                      color: displayFilterOptions.brands ? 'white' : 'black',
                      transition: 'color 0.2s ease-in-out'
                    }}
                  >
                    Бренд
                    <span
                      id='brands'
                      className='filterArrow'
                      style={{
                        transform: displayFilterOptions.brands ? 'rotate(270deg)' : 'rotate(90deg)',
                        color: displayFilterOptions.brands ? 'white' : 'black',
                        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                      }}
                      onClick={toggleFilterOptions}
                    >
                      &#10097;
                    </span>
                  </p>

                  <div
                    className='mobile__filters_container_group_items'
                    style={{
                      display: displayFilterOptions.brands ? 'grid' : 'none'
                    }}
                  >
                    {productBrands.map((brand: Brand) => (
                      <div
                        className='mobile__filters_container_group_items--item'
                        data-name={brand.value}
                        key={brand.value}
                        onClick={(event) => {handleFilterChange(event, 'brand')}}
                      >
                        <p
                          className='mobile__filters_container_group_items--item_name'
                          data-name={brand.value}
                          style={{
                            color: filters.tags.brand[brand.value] ? 'white' : 'black',
                            transition: 'color 0.2s ease-in-out'
                          }}
                        >
                          {brand.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {productGroups.map((group: ProductGroup) => (
                  group.types.length > 0 && (
                    <div
                      className='mobile__filters_container_group'
                      key={group.name}
                    >
                      <p
                        className='mobile__filters_container_group_name'
                        style={{
                          color: displayFilterOptions[group.name] ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        {group.nameUA.charAt(0).toUpperCase() + group.nameUA.slice(1)} &nbsp;
                        <span
                          id={group.name}
                          className='filterArrow'
                          style={{
                            transform: displayFilterOptions[group.name] ? 'rotate(270deg)' : 'rotate(90deg)',
                            color: displayFilterOptions[group.name] ? 'white' : 'black',
                            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                          }}
                          onClick={toggleFilterOptions}
                        >
                          &#10097;
                        </span>
                      </p>

                      <div
                        className='mobile__filters_container_group_items'
                        style={{
                          display: displayFilterOptions[group.name] ? 'grid' : 'none'
                        }}
                      >
                        {group.types.map((productType: ProductType) => (
                          <div
                            className='mobile__filters_container_group_items--item'
                            data-name={productType.name}
                            key={productType.name}
                            onClick={(event) => {handleFilterChange(event, 'productType')}}
                          >
                            <p
                              className='mobile__filters_container_group_items--item_name'
                              data-name={productType.name}
                              style={{
                                color: filters.tags.productType[productType.name] ? 'white' : 'black',
                                transition: 'color 0.2s ease-in-out'
                              }}
                            >
                              {productType.nameUA.charAt(0).toUpperCase() + productType.nameUA.slice(1)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}

                <div className='mobile__filters_container_group'>
                  <p
                    className='mobile__filters_container_group_name'
                    style={{
                      color: displayFilterOptions.colors ? 'white' : 'black',
                      transition: 'color 0.2s ease-in-out'
                    }}
                  >
                    Колір
                    <span
                      id='colors'
                      className='filterArrow'
                      style={{
                        transform: displayFilterOptions.colors ? 'rotate(270deg)' : 'rotate(90deg)',
                        color: displayFilterOptions.colors ? 'white' : 'black',
                        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                      }}
                      onClick={toggleFilterOptions}
                    >
                      &#10097;
                    </span>
                  </p>

                  <div
                    className='mobile__filters_container_group_items'
                    style={{
                      display: displayFilterOptions.colors ? 'grid' : 'none'
                    }}
                  >
                    {productColors.map((color: Color) => (
                      <div
                        className='mobile__filters_container_group_items--item'
                        key={color.hex}
                        data-name={color.hex}
                        onClick={(event) => {handleFilterChange(event, 'color')}}
                      >
                        <div
                          className='mobile__filters_container_group_items--item_color'
                          style={{
                            background: `${color.hex}`,
                          }}
                        />

                        <p
                          className='mobile__filters_container_group_items--item_name'
                          data-name={color.hex}
                          style={{
                            color: filters.tags.color[color.hex] ? 'white' : 'black',
                            transition: 'color 0.2s ease-in-out'
                          }}
                        >
                          {color.valueUA}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className='mobile__filters_container_group'
                >
                  <p
                    className='mobile__filters_container_group_name'
                    style={{
                      color: displayFilterOptions.winter ? 'white' : 'black',
                      transition: 'color 0.2s ease-in-out'
                    }}
                  >
                    Зимовий одяг
                    <span
                      id='winter'
                      className='filterArrow'
                      style={{
                        transform: displayFilterOptions.winter ? 'rotate(270deg)' : 'rotate(90deg)',
                        color: displayFilterOptions.winter ? 'white' : 'black',
                        transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                      }}
                      onClick={toggleFilterOptions}
                    >
                      &#10097;
                    </span>
                  </p>

                  <div
                    className='mobile__filters_container_group_items'
                    style={{
                      display: displayFilterOptions.winter ? 'grid' : 'none'
                    }}
                  >
                    <div
                      className='mobile__filters_container_group_items--item'
                      data-name='winter'
                      onClick={(event) => {handleFilterChange(event, 'keywords')}}
                    >
                      <p
                        className='mobile__filters_container_group_items--item_name'
                        data-name='winter'
                        style={{
                          color: filters.tags.keywords.winter ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        Зима
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mobile__filters_buttons'>
                <button
                  className='mobile__filters_buttons_button'
                  onClick={() => {
                    toggleMenu()
                    goToFilter()
                  }}
                >
                  Фільтр ({filteredProducts.length})
                </button>

                <button
                  className='mobile__filters_buttons_button'
                  onClick={resetFilters}
                >
                  Скинути
                </button>
              </div>
            </div>
          </div>

          <h3
            className='menu__mobile_nav_catalogue'
          >
            КАТАЛОГ
          </h3>

          <ul
            className='menu__mobile_nav_categories'
          >
            {productGroups.map(category => (
              <li
                className='menu__mobile_nav_categories_item'
                key={category.name}
                onClick={() => setCategoryName(category.name)}
              >
                <div
                  className="menu__mobile_nav_categories_item_controls"
                >
                  <NavLink
                    className="menu__mobile_nav_categories_item_controls--link"
                    to={`/vasilkova_shop_client/${category.name.toLowerCase()}`}
                    style={{
                      fontWeight: areTypesVisible && categoryName === category.name ? "bold" : "normal"
                    }}
                    onClick={toggleMenu}
                  >
                    {category.nameUA.split('_').join(' ').toUpperCase()}
                  </NavLink>

                  {category.types.length > 0 &&
                    (
                      <div
                        className='menu__mobile_nav_categories_item_controls--toggleTypes'
                        onClick={() => {
                          setAreTypesVisible(categoryName === category.name ? false : true)
                        }}
                      >
                        <span
                          className='manageTypes'
                          style={{
                            transform: areTypesVisible && categoryName === category.name ? 'rotate(270deg)' : 'rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out'
                          }}
                        >
                          &#10097;
                        </span>
                      </div>
                    )
                  }
                </div>

                {category.types.length > 0 && (
                  <ul
                    className='menu__mobile_nav_categories_item_types'
                    style={{
                      display: areTypesVisible && categoryName === category.name ? 'block' : 'none'
                    }}
                  >
                    {productGroups.map(types => (
                      types.name === categoryName && (
                        types!.types!.map(type => (
                          <li
                            className='menu__mobile_nav_categories_item_types_type'
                            key={type.name}
                            onClick={() => {
                              toggleMenu()
                            }}
                          >
                            <NavLink
                              className="menu__mobile_nav_categories_item_types_type--link"
                              to={`/vasilkova_shop_client/${categoryName.toLowerCase()}/${type.name.toLowerCase()}`}
                              onClick={toggleMenu}
                            >
                              {type.nameUA.split('_').join(' ').toUpperCase()}
                            </NavLink>
                          </li>
                        ))
                      )
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div
            className='menu__mobile_nav_contact'
          >
            <h3
              className='menu__mobile_nav_contact_heading'
            >
              Контакти
            </h3>

            <div className='menu__mobile_nav_contact_wrapper'>
              <img
                className='menu__mobile_nav_contact_wrapper--image'
                src={location}
                alt="/"
              />
              <p>Одеса, вул. Приморська, 18</p>
            </div>

            <div className='menu__mobile_nav_contact_wrapper'>
              <img
                className='menu__mobile_nav_contact_wrapper--image'
                src={phone}
                alt="/"
              />
              <a href="tel:+380504932903">+38 050 493 29 03</a>
            </div>

            <div className='menu__mobile_nav_contact_wrapper'>
              <img
                className='menu__mobile_nav_contact_wrapper--image'
                src={email}
                alt="/"
              />
              <a href="mailto:spetsuha.odessa@gmail.com">spetsuha.odessa@gmail.com</a>
            </div>

            <div className='menu__mobile_nav_contact_wrapper'>
              <img
                className='menu__mobile_nav_contact_wrapper--image'
                src={web}
                alt="/"
              />
              <a href="https://svyatoslav-victor.github.io/vasilkova_shop_client/">Спецуха Одеса</a>
            </div>
          </div>
        </div>
      </div>

      <div className='header'>
        <div className='header__main'>
          <div className='header__main_nav'>
            <div
              className='header__main_nav_logo'
            >
              <Link
                to={'/vasilkova_shop_client'}
                onClick={()=> {
                  setQuery('')
                  setDynamicQuery('')
                }}
              >
                <img src={logo} alt="/" />
              </Link>
            </div>

            {isMobile < 1024 &&
              (
                <div className='header__main_nav_menu'
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <img
                    className='header__main_nav_menu--icon'
                    src={menuClosed}
                    alt="/"
                    style={{
                    width: '1.5em'
                    }}
                  />
                </div>
              )
            }
          </div>

          <div
            className='header__main_search'
          >
            <input
              className='header__main_search--searchBar'
              type="search"
              value={query}
              placeholder='Я шукаю...'
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
              className={isMobile > 1024 ? 'header__main_search--preview' : 'header__main_search_mobile--preview'}
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
                    : <div>{hasLoaded ? 'Співпаданнь не знайдено :(' : 'Шукаємо...'}</div>
                )
              }
            </div>
          </div>

          {isMobile > 600
            ? (
                <div className='header__main_phones'>
                  <div className='header__main_phones_numbers'>
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
              )
            : (
                <div
                  className='header__main_phone'
                  style={{
                    backgroundImage: `url(${phone})`,
                  }}
                >
                  <a
                    href="tel:+380504932903"
                    className='header__main_phones_numbers--number'
                    style={{
                      display: "block",
                      width: "1.5em",
                      height: "1.5em"
                    }}
                  />
                </div>
              )
          }

          {isMobile < 1024 && <div
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
          </div>}
        </div>

        {isMobile >= 1024 && <div className='header__space' />}

        {isMobile >= 1024 && (
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
                onClick={toggleFilters}
              >
                <img
                  className='header__nav_categories_filter--image'
                  src={filter}
                  alt="/"
                  style={{
                    transform: showFilters ? 'rotate(-90deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                />

                <div
                  className='header__nav_categories_filter--filterList'
                  style={{
                    transform: showFilters ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className='filters__container'>
                    <div className="filters__container_group">
                      <p
                        className='filters__container_group_name'
                      >
                        Ціна
                      </p>

                      <div
                        className="filters__container_group_items"
                      >
                        <div
                          className="filters__container_group_items--item"
                          data-sortorder='lowToHigh'
                          onClick={handleSort}
                        >
                          <p
                            className='filters__container_group_items--item_name'
                            data-sortorder='lowToHigh'
                            style={{
                              color: filters.tags.price.lowToHigh ? 'white' : 'black',
                              transition: 'color 0.2s ease-in-out'
                            }}
                          >
                            За зростанням
                          </p>
                        </div>

                        <div
                          className="filters__container_group_items--item"
                          data-sortorder='highToLow'
                          onClick={handleSort}
                        >
                          <p
                            className='filters__container_group_items--item_name'
                            data-sortorder='highToLow'
                            style={{
                              color: filters.tags.price.highToLow ? 'white' : 'black',
                              transition: 'color 0.2s ease-in-out'
                            }}
                          >
                            За спаданням
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className='filters__container_group'
                    >
                      <p
                        className='filters__container_group_name'
                        style={{
                          color: displayFilterOptions.brands ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        Бренд
                        <span
                          id='brands'
                          className='filterArrow'
                          style={{
                            transform: displayFilterOptions.brands ? 'rotate(270deg)' : 'rotate(90deg)',
                            color: displayFilterOptions.brands ? 'white' : 'black',
                            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                          }}
                          onClick={toggleFilterOptions}
                        >
                          &#10097;
                        </span>
                      </p>

                      <div
                        className='filters__container_group_items'
                        style={{
                          display: displayFilterOptions.brands ? 'grid' : 'none'
                        }}
                      >
                        {productBrands.map((brand: Brand) => (
                          <div
                            className='filters__container_group_items--item'
                            data-name={brand.value}
                            key={brand.value}
                            onClick={(event) => {handleFilterChange(event, 'brand')}}
                          >
                            <p
                              className='filters__container_group_items--item_name'
                              data-name={brand.value}
                              style={{
                                color: filters.tags.brand[brand.value] ? 'white' : 'black',
                                transition: 'color 0.2s ease-in-out'
                              }}
                            >
                              {brand.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {productGroups.map((group: ProductGroup) => (
                      group.types.length > 0 && (
                        <div
                          className='filters__container_group'
                          key={group.name}
                        >
                          <p
                            className='filters__container_group_name'
                            style={{
                              color: displayFilterOptions[group.name] ? 'white' : 'black',
                              transition: 'color 0.2s ease-in-out'
                            }}
                          >
                            {group.nameUA.charAt(0).toUpperCase() + group.nameUA.slice(1)} &nbsp;
                            <span
                              id={group.name}
                              className='filterArrow'
                              style={{
                                transform: displayFilterOptions[group.name] ? 'rotate(270deg)' : 'rotate(90deg)',
                                color: displayFilterOptions[group.name] ? 'white' : 'black',
                                transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                              }}
                              onClick={toggleFilterOptions}
                            >
                              &#10097;
                            </span>
                          </p>

                          <div
                            className='filters__container_group_items'
                            style={{
                              display: displayFilterOptions[group.name] ? 'grid' : 'none'
                            }}
                          >
                            {group.types.map((productType: ProductType) => (
                              <div
                                className='filters__container_group_items--item'
                                data-name={productType.name}
                                key={productType.name}
                                onClick={(event) => {handleFilterChange(event, 'productType')}}
                              >
                                <p
                                  className='filters__container_group_items--item_name'
                                  data-name={productType.name}
                                  style={{
                                    color: filters.tags.productType[productType.name] ? 'white' : 'black',
                                    transition: 'color 0.2s ease-in-out'
                                  }}
                                >
                                  {productType.nameUA.charAt(0).toUpperCase() + productType.nameUA.slice(1)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}

                    <div className='filters__container_group'>
                      <p
                        className='filters__container_group_name'
                        style={{
                          color: displayFilterOptions.colors ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        Колір
                        <span
                          id='colors'
                          className='filterArrow'
                          style={{
                            transform: displayFilterOptions.colors ? 'rotate(270deg)' : 'rotate(90deg)',
                            color: displayFilterOptions.colors ? 'white' : 'black',
                            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                          }}
                          onClick={toggleFilterOptions}
                        >
                          &#10097;
                        </span>
                      </p>

                      <div
                        className='filters__container_group_items'
                        style={{
                          display: displayFilterOptions.colors ? 'grid' : 'none'
                        }}
                      >
                        {productColors.map((color: Color) => (
                          <div
                            className='filters__container_group_items--item'
                            key={color.hex}
                            data-name={color.hex}
                            onClick={(event) => {handleFilterChange(event, 'color')}}
                          >
                            <div
                              className='filters__container_group_items--item_color'
                              style={{
                                background: `${color.hex}`,
                              }}
                            />

                            <p
                              className='filters__container_group_items--item_name'
                              data-name={color.hex}
                              style={{
                                color: filters.tags.color[color.hex] ? 'white' : 'black',
                                transition: 'color 0.2s ease-in-out'
                              }}
                            >
                              {color.valueUA}
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
                        style={{
                          color: displayFilterOptions.winter ? 'white' : 'black',
                          transition: 'color 0.2s ease-in-out'
                        }}
                      >
                        Зимовий одяг
                        <span
                          id='winter'
                          className='filterArrow'
                          style={{
                            transform: displayFilterOptions.winter ? 'rotate(270deg)' : 'rotate(90deg)',
                            color: displayFilterOptions.winter ? 'white' : 'black',
                            transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out'
                          }}
                          onClick={toggleFilterOptions}
                        >
                          &#10097;
                        </span>
                      </p>

                      <div
                        className='filters__container_group_items'
                        style={{
                          display: displayFilterOptions.winter ? 'grid' : 'none'
                        }}
                      >
                        <div
                          className='filters__container_group_items--item'
                          data-name='winter'
                          onClick={(event) => {handleFilterChange(event, 'keywords')}}
                        >
                          <p
                            className='filters__container_group_items--item_name'
                            data-name='winter'
                            style={{
                              color: filters.tags.keywords.winter ? 'white' : 'black',
                              transition: 'color 0.2s ease-in-out'
                            }}
                          >
                            Зима
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
                      Фільтр ({filteredProducts.length})
                    </button>

                    <button
                      className='filters__buttons_button'
                      onClick={resetFilters}
                    >
                      Скинути
                    </button>
                  </div>
                </div>
              </div>
              {productGroups.map(category => (
                <li
                  className='header__nav_categories_item'
                  key={category.name}
                  onClick={() => setCategoryName(category.name)}
                  onMouseEnter={() => {
                    setCategoryName(category.name)
                    setAreTypesVisible(true)
                  }}
                >
                  <NavLink
                    className="header__nav_categories_item--navLink"
                    to={`/vasilkova_shop_client/${category.name.toLowerCase()}`}
                    onClick={() => setAreTypesVisible(false)}
                  >
                    {category.nameUA.split('_').join(' ').toUpperCase()}
                  </NavLink>

                  <span
                    className='header__nav_categories_item--underline'
                    style={{
                      width: category.name === categoryName && areTypesVisible ? '100%' : '0',
                      transition: 'width 0.3s ease-in-out'
                    }}
                  />

                  <ul
                    className='header__nav_categories_item_types'
                    style={{
                      transform: category.name === categoryName && areTypesVisible ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    onMouseLeave={() => {
                      setCategoryName('')
                      setAreTypesVisible(false)
                    }}
                  >
                    {category.types.length > 0 && category.types.map((type: ProductType) => (
                      <li
                        className='header__nav_categories_item_types_type'
                        key={type.name}
                        onClick={() => setCategoryName('')}
                      >
                        <Link
                          className="header__nav_categories_item_types_type--link"
                          to={`/vasilkova_shop_client/${categoryName.toLowerCase()}/${type.name.toLowerCase()}`}
                          onClick={() => setAreTypesVisible(false)}
                        >
                          {type.nameUA.split('_').join(' ').toUpperCase()}
                        </Link>
                    </li>
                    ))}
                  </ul>
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
          </div>
        )}
      </div>
    </>
  )
}
