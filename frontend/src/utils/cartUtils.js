export const  addDecimal = (num)=>{
    return (Math.round((num * 100) / 100) ).toFixed(2)
}

export const updateCart = (state) =>{
     //item price
     state.itemsPrice = addDecimal(state.cartItems.reduce((accu, currItem)=> accu + currItem.price * currItem.qty ,0));

     //shipping price(if order is over $100 then free else $20)
     state.shippingPrice = addDecimal(state.itemsPrice>=100 ? 0 : 20);

     //tax price (15% tax)
     state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

     //total price
     state.totalPrice = (
         Number(state.itemsPrice) + 
         Number(state.shippingPrice) + 
         Number(state.taxPrice)
     ).toFixed(2);

     localStorage.setItem('cart',JSON.stringify(state));

     return state;
}