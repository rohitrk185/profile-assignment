'use client';
// import { Cart } from '@/types/cart';
// import { Product } from '@/types/product';
// import React, { ReactNode, createContext, useReducer } from 'react';

// type TStateType = {
//     products: Product[],
//     cart: Cart[]
// }
// // Define the initial state
// const initialState: TStateType = {
//   products: [], // Example: [{ id: 1, name: 'Product 1', price: 100 }, ...]
//   cart: [], // Example: [{ productId: 1, quantity: 2 }, ...]
// };

// // Create a context
// export const CartContext = createContext(initialState);
// // Define the action types
// type CartAction =
//   | { type: 'SET_PRODUCTS'; payload: Product[] }
//   | { type: 'ADD_TO_CART'; payload: Cart }
//   | { type: 'REMOVE_FROM_CART'; payload: number }
//   | { type: 'UPDATE_CART_ITEM'; payload: Cart };
// // Define the reducer function to manage the state
// const cartReducer = (state: TStateType, action: CartAction): TStateType => {
//   switch (action.type) {
//     case 'SET_PRODUCTS':
//       return {
//         ...state,
//         products: action.payload,
//       };
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload),
//       };
//     case 'UPDATE_CART_ITEM':
//       return {
//         ...state,
//         cart: state.cart.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         ),
//       };
//     default:
//       return state;
//   }
// };

// // Create a provider component
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// import { Cart } from '@/types/cart';
// import { Product } from '@/types/product';
// import React, { ReactNode, createContext, useReducer, Dispatch } from 'react';

// // Define the state type
// type TStateType = {
//     products: Product[],
//     cart: Cart[]
// };

// // Define the action types
// type CartAction =
//   | { type: 'SET_PRODUCTS'; payload: Product[] }
//   | { type: 'ADD_TO_CART'; payload: Cart }
//   | { type: 'REMOVE_FROM_CART'; payload: number }
//   | { type: 'UPDATE_CART_ITEM'; payload: Cart };

// // Define the initial state
// const initialState: TStateType = {
//     products: [], // Example: [{ id: 1, name: 'Product 1', price: 100 }, ...]
//     cart: [], // Example: [{ id: 1, productId: 1, quantity: 2 }, ...]
//   };

// // Create a context with an undefined initial value for dispatch
// export const CartContext = createContext<{
//     state: TStateType;
//     dispatch: Dispatch<CartAction>;
//   } | undefined>(undefined);

// // Define the reducer function to manage the state
// const cartReducer = (state: TStateType, action: CartAction): TStateType => {
//   switch (action.type) {
//     case 'SET_PRODUCTS':
//       return {
//         ...state,
//         products: action.payload,
//       };
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cart: [...state.cart, action.payload],
//       };
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload),
//       };
//     case 'UPDATE_CART_ITEM':
//       return {
//         ...state,
//         cart: state.cart.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         ),
//       };
//     default:
//       return state;
//   }
// };

// // Create a provider component
// export const CartProvider = ({ children } : any) => {
//     const [state, dispatch] = useReducer(cartReducer, initialState);

//     return (
//       <CartContext.Provider>
//         {children}
//       </CartContext.Provider>
//     );
//   };

// import { Cart } from "@/types/cart";
// import { Product } from "@/types/product";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode
// } from "react";

// interface ProductContextData {
//     products: Product[];
//     cart: Cart[];
// }

// // interface AndroidPlayerContextData {
// //   currentContent: CurrentlyPlaying | null;
// //   changeTrack: (
// //     playContent: CurrentlyPlaying,
// //     position?: number
// //   ) => Promise<void>;
// //   pause: () => void;
// //   play: () => void;
// //   playerState: AndroidPlayerState | undefined | null;
// //   isPlayerInitialized: boolean;
// //   isLoadingState: boolean | undefined;
// //   isChangingTrack: boolean;
// // }

// // const AndroidPlayerContext = createContext<AndroidPlayerContextData>({} as AndroidPlayerContextData);
// const ProductContext = createContext<ProductContextData>({} as ProductContextData)

// const useProducts = () => useContext(ProductContext)

// // export const usePlayer = () => useContext(AndroidPlayerContext);

// // interface AndroidPlayerProviderProps {
// //   children: ReactNode;
// // }
// interface ProductProviderProps {
//     children: ReactNode;
//   }

// export const AndroidPlayerProvider = ({ children }: ProductProviderProps) => {

//   const [products, setProducts] = useState<Product[]>([])
//   const [cart, setCart] = useState<Cart[]>([])

//   return (
//     <ProductContext.Provider
//       value={{
//         products, setProducts,
//         cart, setCart
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default AndroidPlayerProvider;

import { Cart } from '@/types/cart';
import { Product } from '@/types/product';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IProvider {
  children: ReactNode;
}

interface IProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

const ProductsContext = createContext({} as IProductContext);
export const ProductsProvider = ({ children }: IProvider) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);

interface ICartContext {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}

const CartContext = createContext({} as ICartContext);
export const CartProvider = ({ children }: IProvider) => {
  const [cart, setCart] = useState<Cart[]>([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
