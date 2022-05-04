import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import ArticlePage from './components/articlepage';
import Homepage from './components/homepage';
import './stylesheets/index.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<Homepage />} />
        <Route path="article/:id" element={<ArticlePage />} />

      </Route>
    </Routes>
  </BrowserRouter>
);