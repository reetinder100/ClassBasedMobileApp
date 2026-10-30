import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cartfunc } from "./cart";
import { ModalDataContext } from "../modaldataContext";

const phone = { model: "iPhone", CompanyName: "Apple", price: 1000 };

const renderCart = (ctx) =>
  render(
    <ModalDataContext.Provider
      value={{
        selectedModel: [],
        selectedNumber: {},
        cartItems: {},
        totalproducts: 0,
        buttonTextValue: () => "Add",
        handleSelect: jest.fn(),
        add: jest.fn(),
        sub: jest.fn(),
        ...ctx,
      }}
    >
      <Cartfunc />
    </ModalDataContext.Provider>,
  );

test("shows empty message when cart is empty", () => {
  renderCart({});
  expect(screen.getByText("No items in cart")).toBeInTheDocument();
});

test("renders item and correct total", () => {
  renderCart({
    selectedModel: [phone],
    selectedNumber: { iPhone: 2 },
    cartItems: { iPhone: true },
  });
  expect(screen.getByText("iPhone (2)")).toBeInTheDocument();
  // 1000 × 2 = 2000 — appears in Subtotal and Total rows
  expect(screen.getAllByText("Rs 2000")).toHaveLength(2);
});

test("clicking + calls add with the phone", () => {
  const add = jest.fn();
  renderCart({
    selectedModel: [phone],
    selectedNumber: { iPhone: 2 },
    cartItems: { iPhone: true },
    add,
  });
  fireEvent.click(screen.getByText("+"));
  expect(add).toHaveBeenCalledWith(phone);
});
