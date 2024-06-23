import { createContext, useReducer } from "react";

const CardContext = createContext(null);

//flux
const CardReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

export function CardProvider({ children }) {
  const [card, cardActions] = useReducer(CardReducer, []);
  return (
    <CardContext.Provider value={{ card, cardActions }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
