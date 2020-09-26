import React from 'react';
import { Router } from '@reach/router';
import { view } from '@risingstack/react-easy-state';

import Banner from './components/views/Banner';
import Wrapper from './components/views/Wrapper';

import Home from './components/containers/Home';
import About from './components/containers/About';
import Contact from './components/containers/Contact';
import Shop from './components/containers/Shop';
import Cart from './components/containers/Cart';
import Login from './components/containers/Login';
import ProductShowcase from './components/views/ProductShowcase';

import { appStore } from './components/stores/AppStore';


// configure for our text based pages
const messages = {
  titles: {
    home: "Welcome, To myStore!",
    about: "About Us",
    contact: "Contact Us",
    shop: "Shop",
    cart: "Your Cart",
    login: "Login",
    notFound: "404 Page Not Found"
  }
}


function App() {
  return (
    <>
      <Banner/>
      <Router>
        <Wrapper path="/" title={messages.titles.home} child={<Home/>}/>
        <Wrapper path="/about" title={messages.titles.about} child={<About/>}/>
        <Wrapper path="/contact" title={messages.titles.contact} child={<Contact/>}/>
        <Wrapper path="/shop" title={messages.titles.shop} child={<Shop/>}/>
        <Wrapper path="/shop/:product_id" child={<ProductShowcase/>}/>
        <Wrapper path="/cart" title={messages.titles.cart} child={<Cart/>}/>
        <Wrapper path="/login" title={messages.titles.login} child={<Login/>}/>
        <Wrapper default title={messages.titles.notFound} />
      </Router>
    </>
  );
}

export default view(App);
