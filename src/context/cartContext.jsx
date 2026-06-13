import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}){

    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);

            if(existingItem){
                return prevCart.map((i) => 
                    i.id === item.id ? { ...i, quantity: i.quantity + 1} : i
                );
            }
            return [...prevCart, { ...item, quantity: 1}];
        });
    }

    const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);
      
      // If quantity is 1, remove the item completely
      if (existingItem.quantity === 1) {
        return prevCart.filter((i) => i.id !== itemId);
      }
      
      // Otherwise, just decrease the quantity by 1
      return prevCart.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((i) => i.id !== itemId))
    }

    const clearCart = () => {
        setCart([]);
    }

    const cartTotal = cart.reduce((total, item) => total + item.price*item.quantity, 0);

    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);



    return (
        <CartContext.Provider 
            value={{
                cart, addToCart, removeFromCart, clearCart, cartTotal, totalItems, decreaseQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);