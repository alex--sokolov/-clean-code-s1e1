import './css/styles.scss';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Error404 } from './pages/Error404';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Utils from './utils/Utils';
import {CategoryData} from "./components/CategoryData";

const homeInstance = new Home();
const settingsSettings = new Settings();
const categoriesInstance = new Categories();
const categoryInstance = new Category();
const error404Instance = new Error404();

const headerInstance = new Header();
const footerInstance = new Footer();

const routes = {
  '/': homeInstance,
  '/settings': settingsSettings,
  '/categories': categoriesInstance,
  '/category': categoryInstance,
};

const router = async () => {
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');
  header.innerHTML = await headerInstance.render();
  await headerInstance.after_render();
  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();
  const request = Utils.parseRequestURL();
  const parsedURL = (request[0] ? `${request[0]}` : '/');
  const params = request[1] ? request[1] : '';
  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;
  content.innerHTML = await page.render(params);
  await page.after_render(params);
};




window.addEventListener('hashchange', Utils.sleep(5));
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
