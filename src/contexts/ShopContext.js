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
    case "VACIAR_CARRITO": {
      return {
        carrito: [],
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
  emptyCart: () => {},
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
  const emptyCart = () => {
    dispatch({
      type: "VACIAR_CARRITO",
    });
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        addItem,
        deleteItem,
        emptyCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
