import React from 'react';
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation
} from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';
import { getAllProducts } from './products';
import { productGroups } from './productInfo';

import {
  ProductInfo,
  ProductGroup,
  ProductType,
  CartItem,
  Paginator
} from './types';

import { MiniCart } from './components/MiniCart/MiniCart';
import { Header } from './components/Header/Header';
import { Cart } from './components/Cart/Cart';
import { Checkout } from './components/Checkout/Checkout';
import { ThankYou } from './components/ThankYou/ThankYou';
import { Home } from './components/Home/Home';
import { Search } from './components/Search/Search';
import { Category } from './components/Category/Category';
import { Goods } from './components/Goods/Goods';
import { Product } from './components/Product/Product';
import { Loader } from './components/Loader/Loader';
import classNames from 'classnames';

import mapIcon from './shop_icons/location.svg';
import phone from './shop_icons/smartphone-svgrepo-com.svg';
import email from './shop_icons/email.svg';
import web from './shop_icons/web-svgrepo-com.svg';

import loc from './shop_icons/location.png';
import ph from './shop_icons/smartphone.png';
import em from './shop_icons/email.png';
import wb from './shop_icons/web.png';

import './App.scss';

export const App: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInfo[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductInfo[]>([]);
  const [previewSearch, setPreviewSearch] = useState<ProductInfo[]>([]);
  const [productName, setProductName] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [areTypesVisible, setAreTypesVisible] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');
  const [isMobile, setIsMobile] = useState<number>(window.innerWidth);

  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<string>('');

  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.cartContents || "[]"));
  const [productCount, setProductCount] = useState<number>(+localStorage.totalCount || 0);
  const hasPreorderGoods = cart.some((item: CartItem) => item.price === 0);
  const hasAllPreorderGoods = cart.every((item: CartItem) => item.price === 0);

  const [cartItemId, setCartItemId] = useState<string>('');
  const [newSpecs, setNewSpecs] = useState<string>('');

  const [paginationParams, setPaginationParams] = useState<Paginator>({
    total: products.length,
    perPage: +localStorage.perPage || 3,
    page: 1
  })

  const [selectPage, setSelectPage] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');
  const [dynamicQuery, setDynamicQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const navigate = useNavigate();
  const location = useLocation();

  const [showImageView, setShowImageView] = useState<boolean>(false);
  const appRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (appRef.current !== null) {
      appRef.current.scrollTo(0, 0);
      appRef.current.style.overflow = 'overlay';
    }
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth)
    }, false);
  }, [isMobile])

  useEffect(() => {
    localStorage.setItem('cartContents', JSON.stringify(cart));
    localStorage.setItem('totalCount', productCount.toString());
  }, [cart, productCount])

  const toggleMiniCart = () => {
    if (!showMiniCart) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'hidden'
      }
      setShowMiniCart(true)
    } else {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowMiniCart(false)
    }
  }

  const toggleImageView = () => {
    if (!showImageView) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'hidden'
      }
      setShowImageView(true)
    } else {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowImageView(false)
    }
  }

  const toggleFilters = () => {
    if (!showFilters) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'hidden'
      }
      setShowFilters(true)
    } else {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowFilters(false)
      setCategoryName('')
      setAreTypesVisible(false)
    }
  }

  const toggleMenu = () => {
    if (!showMenu) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'hidden'
      }
      setShowMenu(true)
    } else {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowMenu(false)
      setCategoryName('')
      setAreTypesVisible(false)
    }
  }

  const closeModals = () => {
    if (showMiniCart) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowMiniCart(false)
    }

    if (showImageView) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowImageView(false)
    }

    if (showFilters) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowFilters(false)
      setCategoryName('')
      setAreTypesVisible(false)
    }

    if (showMenu) {
      if (appRef.current !== null) {
        appRef.current.style.overflow = 'overlay'
      }
      setShowMenu(false)
      setCategoryName('')
      setAreTypesVisible(false)
    }

    if (selectPage) {
      setSelectPage(false)
    }
  }

  const fillCart = (data: CartItem) => {
    if (cart.length === 0) {
      setCart([...cart, data]);
      setProductCount(data.quantity);
    } else {
      cart.forEach((item: CartItem) => {
        if (cart.find((item: CartItem) => item._id === data._id)) {
          if (item._id === data._id) {
            Object.assign(item,
              { quantity: item.quantity + data.quantity },
              { specs: item.specs + ", " + data.specs }
            );
            setProductCount(prevState => prevState + data.quantity)
          }
          return;
        } else {
          setCart([...cart, data]);
          setProductCount(productCount + data.quantity);
        }
      })
    }
  }

  const editSpecs = (id: string, newSpecs: string) => {
    const cartCopy = [...cart].map(
      (item: CartItem) => (item._id === id
        ? Object.assign(item, { specs: newSpecs })
        : item
      )
    );

    setCart(cartCopy);
  }

  const resetEditSpecs = () => {
    setCartItemId('');
    setNewSpecs('')
  }

  const addItem = (id: string) => {
    const cartCopy = [...cart].map(
      (item: CartItem) => (item._id === id
        ? Object.assign(item, { quantity: item.quantity + 1 })
        : item
      )
    );

    setProductCount(prevState => prevState + 1);
    setCart(cartCopy);
  };

  const removeProduct = (id: string, item: CartItem) => {
    setCart(cart.filter((item: CartItem) => item._id !== id))
    setProductCount(prevState => prevState - item.quantity);
  }

  const removeItem = (id: string) => {
    const cartCopy = [...cart].map(
      (item: CartItem) => (item._id === id
        ? Object.assign(item, { quantity: item.quantity - 1 })
        : item
      )
    );

    setProductCount(prevState => prevState - 1);
    setCart(cartCopy.filter((item: CartItem) => item.quantity > 0))
  };


  const clearCart = () => {
    setCart([]);
    setProductCount(0);

    localStorage.removeItem('cartContents');
    localStorage.removeItem('totalCount');
  }

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const scroll = scrollHeight - scrollTop - clientHeight;

    if (scroll < scrollTop * 2) {
      setShowScrollToTop(true)
    } else {
      setShowScrollToTop(false)
    }
  }

  const findProductType = () => {
    return productGroups.find((productGroup: ProductGroup) => (
      productGroup.name === location.pathname.split('/')[location.pathname.split('/').length - 1]))
  }

  const setGoods = () => {
    return products.filter((product: ProductInfo) => product.productType
      .split(' ').join('_').toLowerCase()
        .match(location.pathname.split('/')[location.pathname.split('/').length - 1]))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getAllProducts();
      setProducts(productList);
      setPopularProducts(productList.filter((product: ProductInfo) => product.isPopular));
      setFilteredProducts(searchQuery
        ? productList.filter((product: ProductInfo) => {
            return product.productId.includes(searchQuery)
            || product.name.toLowerCase().includes(searchQuery)
            || product.keywords.find((keyword: string) => keyword.toLowerCase().includes(searchQuery))
        })
        : productList  
      );
      setLoading(false);
    }

    fetchProducts();
    setCategories(productGroups.map((productGroup: ProductGroup) => (
      productGroup.name
    )));
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true)
  }, [location.search])

  useEffect(() => {
    window.addEventListener('popstate', closeModals)
  })

  const goToSearch = () => {
    setDynamicQuery('');

    if (query !== '') {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);

    navigate({
      pathname: `/vasilkova_shop_client/search_results/${paginationParams.page}`,
      search: searchParams.toString()
    }, { replace: true });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query) {
        return;
      } else {
        setDynamicQuery(query);
      }
    }, 300) // changed from 500 to prevent dynamic results list from rendering too fast

    return () => clearTimeout(timer)
  }, [query])  

  useEffect(() => {
    const previewedProducts = products.filter((product: ProductInfo) => {

      if (dynamicQuery !== '') {
        return product.productId.includes(dynamicQuery)
          || product.name.toLowerCase().includes(dynamicQuery)
          || product.keywords.find((keyword: string) => keyword.toLowerCase().includes(dynamicQuery))
      }
    });

      setPreviewSearch(previewedProducts);
  }, [dynamicQuery]);

  const nextPage = () => {
    setPaginationParams({
      ...paginationParams,
      page: paginationParams.page + 1
    })
  };

  const previousPage = () => {
    setPaginationParams({
      ...paginationParams,
      page: paginationParams.page - 1
    })
  };

  const onPageChange = (current: number) => {
    setPaginationParams({
      ...paginationParams,
      page: current
    })
  };

  const onPerPageChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationParams({
      ...paginationParams,
      perPage: +event.target.value,
      page: 1
    })
  };

  return (
    loading ? <Loader /> : <div
      className='app'
      ref={appRef}
      onClick={closeModals}
      onScroll={handleScroll}
    >

      <div
        className={classNames({
          'app__overlay-visible': showMiniCart || showImageView || showMenu,
          'app__overlay-hidden': !showMiniCart || !showImageView || !showMenu,
        })}
      >
      </div>

      <div
        className="scrollToTop"
      >
        <button
          className="scrollToTop__button"
          style={{
            opacity: !showScrollToTop ? 0 : 1,
          }}
          onClick={() => {
            appRef.current?.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}
        >
          &#10097;
        </button>
      </div>

      <MiniCart
        cart={cart}
        showMiniCart={showMiniCart}
        toggleMiniCart={toggleMiniCart}
        productCount={productCount}
        addItem={addItem}
        removeItem={removeItem}
        removeProduct={removeProduct}
        clearCart={clearCart}
        hasPreorderGoods={hasPreorderGoods}
        hasAllPreorderGoods={hasAllPreorderGoods}
        isMobile={isMobile}
        editSpecs={editSpecs}
        resetEditSpecs={resetEditSpecs}
        cartItemId={cartItemId}
        setCartItemId={setCartItemId}
        newSpecs={newSpecs}
        setNewSpecs={setNewSpecs}
      />

      <div className='app__content'>
        <Header
          categoryName={categoryName}
          productGroups={productGroups}
          setCategoryName={setCategoryName}
          areTypesVisible={areTypesVisible}
          setAreTypesVisible={setAreTypesVisible}
          goToSearch={goToSearch}
          query={query}
          setQuery={setQuery}
          products={products}
          previewSearch={previewSearch}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          dynamicQuery={dynamicQuery}
          setDynamicQuery={setDynamicQuery}
          productCount={productCount}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          showMenu={showMenu}
          toggleFilters={toggleFilters}
          toggleMenu={toggleMenu}
          toggleMiniCart={toggleMiniCart}
          isMobile={isMobile}
          paginationParams={paginationParams}
        />

        <Routes>
          <Route
            path='/'
            element={<Home
              products={popularProducts}
            />}
          />

          <Route
            path='/vasilkova_shop_client'
            element={<Home
              products={popularProducts}
            />}
          />

          <Route
            path='/vasilkova_shop_client/thank_you'
            element={<ThankYou />}
          />

          <Route
            path='/vasilkova_shop_client/checkout'
            element={<Checkout
              cart={cart}
              clearCart={clearCart}
              hasPreorderGoods={hasPreorderGoods}
              hasAllPreorderGoods={hasAllPreorderGoods}
              isMobile={isMobile}
              />}
          />

          <Route
            path='/vasilkova_shop_client/cart'
            element={<Cart
              cart={cart}
              clearCart={clearCart}
              addItem={addItem}
              removeItem={removeItem}
              removeProduct={removeProduct}
              hasPreorderGoods={hasPreorderGoods}
              hasAllPreorderGoods={hasAllPreorderGoods}
              editSpecs={editSpecs}
              resetEditSpecs={resetEditSpecs}
              cartItemId={cartItemId}
              setCartItemId={setCartItemId}
              newSpecs={newSpecs}
              setNewSpecs={setNewSpecs}
            />}
          />

          <Route
            path='/vasilkova_shop_client/search_results/:currentPage'
            element={loading ? <Loader /> : <Search
              products={filteredProducts}
              setProduct={setProductName}
              paginationParams={paginationParams}
              setPaginationParams={setPaginationParams}
              searchParams={searchParams}
              nextPage={nextPage}
              previousPage={previousPage}
              onPageChange={onPageChange}
              onPerPageChange={onPerPageChange}
              selectPage={selectPage}
              setSelectPage={setSelectPage}
            />}
          />

          <Route
            path={`/vasilkova_shop_client/:categoryName`}
            element={<Category
              productTypes={
                findProductType() ? findProductType()!.types : productTypes
              }
              setProductTypes={setProductTypes}
              productGroups={productGroups}
              isMobile={isMobile}
            />}
          />

          <Route
            path={`/vasilkova_shop_client/:categoryName/:type`} // the following code was written to NOT USE localStorage for variables which reset upon page reload
            element={products.length > 0
              ? <Goods
                  goodsList={setGoods()}
                  setProduct={setProductName}
                  isMobile={isMobile}
                />
              : <Loader />}
          />

          <Route
            path={`/vasilkova_shop_client/:categoryName/:type/:productId`}
            element={<Product
              goodsList={products}
              fillCart={fillCart}
              showImageView={showImageView}
              toggleImageView={toggleImageView}
              closeModals={closeModals}
              isMobile={isMobile}
            />}
          />
        </Routes>

        <div
          className='app__content_footer'
        >

          <h3
            className='app__content_footer_heading'
          >
            Контакти
          </h3>

          <div
            className='app__content_footer_contact'
          >
            <a
              href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F,+18,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%B0,+%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+65000/@46.4915117,30.734219,17z/data=!4m13!1m7!3m6!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!2z0YPQuy4g0J_RgNC40LzQvtGA0YHQutCw0Y8sIDE4LCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!3b1!8m2!3d46.4915117!4d30.7364077!3m4!1s0x40c631b949c8ebd1:0x200c597a9e1e2b08!8m2!3d46.4915117!4d30.7364077"
              target="_blank"
              className='app__content_footer_contact_wrapper'
              id='address'
              onMouseOver={(event) => setShowContact(event.currentTarget.id)}
              onMouseOut={(event) => setShowContact('')}
            >
              <img
                className='app__content_footer_contact_wrapper--image'
                src={mapIcon}
                alt="/"
              />
                {isMobile > 1024
                  ? <span
                      className='app__content_footer_contact_wrapper--info'
                      style={{
                        transform: showContact === 'address' ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: "transform 0.2s ease-in-out"
                      }}
                    >
                      Одеса, вул. Приморська, 18
                    </span>
                  : <span>Одеса, вул. Приморська, 18</span>
                }
            </a>

            <a
              href="tel:+380504932903"
              className='app__content_footer_contact_wrapper'
              id='phone'
              onMouseOver={(event) => setShowContact(event.currentTarget.id)}
              onMouseOut={(event) => setShowContact('')}
            >
              <img
                className='app__content_footer_contact_wrapper--image'
                src={phone}
                alt="/"
              />
                {isMobile > 1024
                  ? <span
                      className='app__content_footer_contact_wrapper--info'
                      style={{
                        transform: showContact === 'phone' ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: "transform 0.2s ease-in-out"
                      }}
                    >
                      +38 050 493 29 03
                    </span>
                  : <span>+38 050 493 29 03</span>
                }
            </a>

            <a
              href="mailto:spetsuha.odessa@gmail.com"
              target="_blank"
              className='app__content_footer_contact_wrapper'
              id='email'
              onMouseOver={(event) => setShowContact(event.currentTarget.id)}
              onMouseOut={(event) => setShowContact('')}
            >
              <img
                className='app__content_footer_contact_wrapper--image'
                src={email}
                alt="/"
              />
                {isMobile > 1024
                  ? <span
                      className='app__content_footer_contact_wrapper--info'
                      style={{
                        transform: showContact === 'email' ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: "transform 0.2s ease-in-out"
                      }}
                    >
                      spetsuha.odessa@gmail.com
                    </span>
                  : <span>spetsuha.odessa@gmail.com</span>
                }
            </a>

            <a
              href="https://svyatoslav-victor.github.io/vasilkova_shop_client/"
              className='app__content_footer_contact_wrapper'
              id='site'
              onMouseOver={(event) => setShowContact(event.currentTarget.id)}
              onMouseOut={() => setShowContact('')}
            >
              <img
                className='app__content_footer_contact_wrapper--image'
                src={web}
                alt="/"
              />
                {isMobile > 1024
                  ? <span
                      className='app__content_footer_contact_wrapper--info'
                      style={{
                        transform: showContact === 'site' ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: "transform 0.2s ease-in-out"
                      }}
                    >
                      Спецуха Одеса
                    </span>
                  : <span>Спецуха Одеса</span>
                }
            </a>
          </div>

          <p
            className='app__content_footer_copywrite'
          >
            &#169; 2023
          </p>
          <img src={loc} alt="" style={{ width: '1em', height: '1em' }} />
          <img src={ph} alt="" style={{ width: '1em', height: '1em' }} />
          <img src={em} alt="" style={{ width: '1em', height: '1em' }} />
          <img src={wb} alt="" style={{ width: '1em', height: '1em' }} />
        </div>
      </div>
    </div>
  );
}
