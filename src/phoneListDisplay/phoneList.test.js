import React from "react";
import { render, act } from "@testing-library/react";
import PhoneList from "./mainPage";

const phone = { model: "iPhone", CompanyName: "Apple", price: 1000 };
const galaxy = { model: "Galaxy", CompanyName: "Samsung", price: 800 };

const renderList = () => {
  let instance;
  render(
    <PhoneList
      ref={(node) => {
        instance = node;
      }}
    />,
  );
  return instance;
};

test("handleSelect adds a phone to the cart", () => {
  const c = renderList();
  act(() => {
    c.handleSelect(phone);
  });
  expect(c.state.selectedModel).toEqual([phone]);
  expect(c.state.cartItems[phone.model]).toBe(true);
  expect(c.state.totalproducts).toBe(1);
});

test("handleSelect removes the phone when selected again", () => {
  const c = renderList();
  act(() => {
    c.handleSelect(phone);
  });
  act(() => {
    c.handleSelect(phone);
  });
  expect(c.state.selectedModel).toEqual([]);
  expect(c.state.cartItems[phone.model]).toBe(false);
  expect(c.state.totalproducts).toBe(0);
});

test("add increments quantity only when item is in cart", () => {
  const c = renderList();
  act(() => {
    c.add(phone);
  }); // not in cart → unchanged
  expect(c.state.selectedNumber[phone.model]).toBeUndefined();

  act(() => {
    c.handleSelect(phone);
  }); // now in cart
  act(() => {
    c.add(phone);
  });
  expect(c.state.selectedNumber[phone.model]).toBe(2);
});

test("sub decrements quantity when item is in cart", () => {
  const c = renderList();
  act(() => {
    c.handleSelect(phone);
  });
  act(() => {
    c.add(phone);
  });
  act(() => {
    c.sub(phone);
  });
  expect(c.state.selectedNumber[phone.model]).toBe(1);
});

test("handlesearch filters case-insensitively by company or model", () => {
  const c = renderList();
  act(() => {
    c.handlesearch("apple");
  });
  expect(c.state.filteredlist.every((p) => p.CompanyName === "Apple")).toBe(
    true,
  );

  act(() => {
    c.handlesearch("GALAXY");
  });
  expect(c.state.filteredlist.some((p) => p.model === "Galaxy")).toBe(true);
});
