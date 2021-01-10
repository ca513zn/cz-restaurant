import React, { createContext, useEffect, useReducer } from "react";
import firebase from "../lib/firebase";

const initialShopState = {
    carrito: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item } = action.payload;
            console.log(item)
            return {
                carrito: [...state.carrito, item]
            };
        }

        default: {
            return { ...state };
        }
    }
};

const ShopContext = createContext({
    ...initialShopState,
    addItem: () => { },
});

export const ShopProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialShopState);

    const addItem = (item) => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                item: item
            },
        })
    }

    return (
        <ShopContext.Provider
            value={{
                ...state,
                addItem,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;
