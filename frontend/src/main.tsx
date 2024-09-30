import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./modules/registration/redux/store.ts";
import i18n from "./i18n.ts";
import {I18nextProvider} from "react-i18next";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <I18nextProvider i18n={i18n}>
      <Provider store={store}>
          <App />
      </Provider>
      </I18nextProvider>
  </StrictMode>,
)
