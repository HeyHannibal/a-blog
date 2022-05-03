import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import ArticlePage from './components/articlepage';
import './stylesheets/index.css';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} >
    <Route path="article/:id" element={<ArticlePage />} />    
    </Route>
  </Routes>
</BrowserRouter>
, rootElement);