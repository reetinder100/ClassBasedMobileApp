import React, { useContext } from "react";
import { Button1, Cart, Iconbuttons, Layout, Button2 } from "./styling";
import { ModalDataContext } from "./MainPage";
import { CartSummary } from "./styling";

export const Cartfunc = () => {
  const {
    selectedModel,
    selectedNumber,
    totalproducts,
    buttonTextValue,
    handleSelect,
    add,
    sub,
    cartItems,
  } = useContext(ModalDataContext);

  const totalPrice = () => {
    let price = 0;

    for (let i = 0; i < selectedModel.length; i++) {
      const quantity = selectedNumber[selectedModel[i].model] || 1;
      price = price + selectedModel[i].price * quantity;
    }
    return price;
  };

  if (selectedModel.length == 0) {
    return (
      <Cart>
        <h1>No items in cart</h1>
      </Cart>
    );
  } else
    return (
      <div>
        <Cart>
          {selectedModel.map((phone) => (
            <div
              key={phone.model}
              style={{
                borderBottom: "1px solid #eee",
                padding: "15px 0",
                marginBottom: "10px",
              }}
            >
              <h1>
                {phone.model} ({selectedNumber[phone.model] || 1})
              </h1>
              <p>Company: {phone.CompanyName}</p>
              <p>Model: {phone.model}</p>
              <p>Price: Rs {phone.price}</p>

              <Layout>
                <Button1 onClick={() => handleSelect(phone)}>
                  {buttonTextValue(phone)}
                </Button1>

                <Button2
                  onClick={() => sub(phone)}
                  disabled={
                    selectedNumber[phone.model] <= 1 || !cartItems[phone.model]
                  }
                >
                  -
                </Button2>

                <Button2
                  onClick={() => add(phone)}
                  disabled={!cartItems[phone.model]}
                >
                  +
                </Button2>
              </Layout>
            </div>
          ))}
        </Cart>

        <CartSummary>
          <h2>Order Summary</h2>
          <div className="row">
            <span>Subtotal ({totalproducts})</span>
            <span>Rs {totalPrice()}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>Rs 0</span>
          </div>
          <div className="row">
            <span>Tax</span>
            <span>Rs 0</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>Rs {totalPrice()}</span>
          </div>
        </CartSummary>
      </div>
    );
};
