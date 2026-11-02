import { useState, useCallback } from "react";

const initialState = {
  cartItems: {},
  selectedNumber: {},
  selectedModel: [],
  totalproducts: 0,
};

export const useCart = () => {
  const [cart, setCart] = useState(initialState);

  // ---------- ADD ----------
  const add = useCallback((phone) => {
    setCart((prev) => {
      if (!prev.cartItems[phone.model]) return prev;

      const current = prev.selectedNumber[phone.model] || 1;
      return {
        ...prev,
        selectedNumber: { ...prev.selectedNumber, [phone.model]: current + 1 },
        totalproducts: prev.totalproducts + 1,
      };
    });
  }, []);

  // ---------- SUB ----------
  const sub = useCallback((phone) => {
    setCart((prev) => {
      if (!prev.cartItems[phone.model]) return prev;

      const current = prev.selectedNumber[phone.model] || 1;
      if (current <= 1) return prev;
      return {
        ...prev,
        selectedNumber: { ...prev.selectedNumber, [phone.model]: current - 1 },
        totalproducts: prev.totalproducts - 1,
      };
    });
  }, []);

  // ---------- TOGGLE ----------
  const toggle = useCallback((phone) => {
    setCart((prev) => {
      const isCurrentlyInCart = !!prev.cartItems[phone.model];

      if (isCurrentlyInCart) {
        // REMOVE from cart
        const qty = prev.selectedNumber[phone.model] || 1;
        return {
          ...prev,
          selectedModel: prev.selectedModel.filter(
            (item) => item.model !== phone.model,
          ),
          selectedNumber: { ...prev.selectedNumber, [phone.model]: 1 },
          cartItems: { ...prev.cartItems, [phone.model]: false },
          totalproducts: prev.totalproducts - qty,
        };
      }

      // ADD to cart
      return {
        ...prev,
        selectedModel: [...prev.selectedModel, phone],
        cartItems: { ...prev.cartItems, [phone.model]: true },
        totalproducts: prev.totalproducts + 1,
      };
    });
  }, []);

  // ---------- BUTTON TEXT ----------
  const buttonTextValue = useCallback(
    (phone) => {
      return cart.cartItems[phone.model] ? "Remove from cart" : "Add to Cart";
    },
    [cart.cartItems],
  );

  return {
    cartItems: cart.cartItems,
    selectedNumber: cart.selectedNumber,
    selectedModel: cart.selectedModel,
    totalproducts: cart.totalproducts,
    add,
    sub,
    toggle,
    buttonTextValue,
  };
};
