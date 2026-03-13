export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAV": {
      const id = action.payload;

      const updated = { ...state };

      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }

      localStorage.setItem("favourites", JSON.stringify(updated));

      return updated;
    }

    default:
      return state;
  }
}

export const initialState = 
    JSON.parse(localStorage.getItem("favourites")) || {};

