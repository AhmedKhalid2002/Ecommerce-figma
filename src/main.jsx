import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import { UserTokenProvider } from './Contex/userTokenContext.jsx'
import { ProductDetailsProvider } from './Contex/ProductDetailsContext.jsx'
import { CartContextProvider } from './Contex/CartContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WishlistContextProvider } from './Contex/WishListContext.jsx'

const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <WishlistContextProvider>
        <CartContextProvider>
            <ProductDetailsProvider>
                <UserTokenProvider>
                    <App/>
                </UserTokenProvider>
            </ProductDetailsProvider>
        </CartContextProvider>
        </WishlistContextProvider>
    </QueryClientProvider>
)
