const initialState = {
  ownersList: []
};

const ownersReducer = (state = initialState, action) =>
{
  switch (action.type) {
    case 'GET_OWNERS_DATA':
      return {
        ...state, 
        ownersList: action.payload
      };
    default:
      return state;
  }
};

export default ownersReducer;
