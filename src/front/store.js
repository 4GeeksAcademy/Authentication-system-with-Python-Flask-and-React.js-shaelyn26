export const initialStore=()=>{
  return{
    token: null         // <-- difference btw null: use to make a condition & []: this'll be the empty array-->
  
  
  
  }
}

export default function storeReducer(store, action = {}) {
  if (action.type == "updateToken"){
    return {
      ...store,
      token: action.payload
    };

  }
  
}
