import React from 'react';
import { Routes, Route, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getAllProducts } from './products';
import { productGroups } from './productInfo';
import {
  ProductInfo,
  ProductGroup,
  ProductType,
  CartItem
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

import './App.scss';

export const App: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInfo[]>([]);
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

  const [cart, setCart] = useState<CartItem[]>(JSON.parse(localStorage.cartContents || "[]"));
  const [productCount, setProductCount] = useState<number>(+localStorage.totalCount || 0);
  const hasPreorderGoods = cart.some((item: CartItem) => item.price === 0);
  const hasAllPreorderGoods = cart.every((item: CartItem) => item.price === 0);

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
      appRef.current.scrollTo(0, 0)
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
      pathname: '/vasilkova_shop_client/search_results',
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
    }, 500)

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

  return (
    <div
      className='app'
      ref={appRef}
      onClick={closeModals}
      onScroll={handleScroll}
    >

      <div
        className={classNames({
          'app__overlay-visible': showMiniCart || showImageView,
          'app__overlay-hidden': !showMiniCart || !showImageView,
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
          &#8793;
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
          displayFilters={showFilters}
          setShowFilters={setShowFilters}
          displayMenu={showMenu}
          toggleFilters={toggleFilters}
          toggleMenu={toggleMenu}
          toggleMiniCart={toggleMiniCart}
          isMobile={isMobile}
        />

        <Routes>
          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/vasilkova_shop_client'
            element={<Home />}
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
            />}
          />

          <Route
            path='/vasilkova_shop_client/search_results'
            element={loading ? <Loader /> : <Search
              products={filteredProducts}
              setProduct={setProductName}
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
            />}
          />

          <Route
            path={`/vasilkova_shop_client/:categoryName/:type`} // the following code was written to NOT USE localStorage for variables which reset upon page reload
            element={products.length > 0
              ? <Goods
                  goodsList={setGoods()}
                  setProduct={setProductName}
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
          &#169; 2022
        </div>
      </div>
    </div>
  );
}
