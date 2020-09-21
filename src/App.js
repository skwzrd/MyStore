import React from 'react';
import { Router } from '@reach/router';
import { view } from '@risingstack/react-easy-state';

import Banner from './components/views/Banner';
import Info from './components/views/Info';

import Home from './components/containers/Home';
import About from './components/containers/About';
import Contact from './components/containers/Contact';
import Shop from './components/containers/Shop';
import Cart from './components/containers/Cart';
import Login from './components/containers/Login';

import { appStore } from './components/stores/AppStore';


// configure for our text based pages
const messages = {
  titles: {
    home: "Welcome, To My Store!",
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
        <Info path="/" title={messages.titles.home} child={<Home/>}/>
        <Info path="/about" title={messages.titles.about} child={<About/>}/>
        <Info path="/contact" title={messages.titles.contact} child={<Contact/>}/>
        <Info path="/shop" title={messages.titles.shop} child={<Shop/>}/>
        <Info path="/cart" title={messages.titles.cart} child={<Cart/>}/>
        <Info path="/login" title={messages.titles.login} child={<Login/>}/>
        <Info default title={messages.titles.notFound} />
      </Router>
    </>
  );
}

export default view(App);
