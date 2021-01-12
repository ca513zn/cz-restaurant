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
    case "DELETE_ITEM": {
      const { nombre } = action.payload;
      return {
        carrito: [...state.carrito.filter((el) => el.item.nombre !== nombre)],
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
  deleteItem: () => {},
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
  const deleteItem = (nombre) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: {
        nombre: nombre,
      },
    });
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        addItem,
        deleteItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
