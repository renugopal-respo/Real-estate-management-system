import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import Store from './Redux/Store.js'
import TestComponents from './TestComponents.jsx'
import PropertyContextProvider from './Contextapi/Propertycontext.jsx'
import ManagementSideLoginForm from './AdminComponents/ManagementSideLoginForm/ManagementSideLoginForm.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={Store}>
<PropertyContextProvider>
   <App/>
</PropertyContextProvider>

</Provider>  
  </StrictMode>,
)
