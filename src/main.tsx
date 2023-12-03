import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { setupStore } from "./store/store.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./utils/router.tsx";

const store = setupStore();
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);
