import React, { createContext, useReducer } from "react";

const initialShopState = {
  carrito: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item } = action.payload;
      return {
        carrito: [...state.carrito, item],
      };
    }

    default: {
      return { ...state };
    }
  }
};

const ShopContext = createContext({
  ...initialShopState,
  addItem: () => {},
});

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialShopState);

  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: item,
      },
    });
  };

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
