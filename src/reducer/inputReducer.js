import {ethers} from 'ethers'

export const inputInitialState = {
  userName: "Alice",
  userLastName: "Butterin",
  address: ethers.constants.AddressZero,
  text: "text",
};

export const inputReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_LASTNAME":
      return {
        ...state,
        lastName: action.payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
      };

    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};

