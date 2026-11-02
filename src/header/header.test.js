import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../header";

const setup = (props = {}) =>
  render(
    <Header
      showCart={jest.fn()}
      back={jest.fn()}
      onsearch={jest.fn()}
      {...props}
    />,
  );

test("renders the brand title and search input", () => {
  setup();
  expect(screen.getByText("MobileSoft")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
});

test("typing updates the input value", () => {
  setup();
  const input = screen.getByPlaceholderText("Search products...");
  fireEvent.change(input, { target: { value: "apple" } });
  expect(input.value).toBe("apple");
});

test("typing calls onsearch with the raw value", () => {
  const onsearch = jest.fn();
  setup({ onsearch });
  fireEvent.change(screen.getByPlaceholderText("Search products..."), {
    target: { value: "galaxy" },
  });
  expect(onsearch).toHaveBeenCalledWith("galaxy");
  expect(onsearch).toHaveBeenCalledTimes(1);
});

test("clicking the cart icon calls showCart", () => {
  const showCart = jest.fn();
  setup({ showCart });
  fireEvent.click(screen.getByAltText("image"));
  expect(showCart).toHaveBeenCalledTimes(1);
});

test("clicking the back button calls back", () => {
  const back = jest.fn();
  setup({ back });
  fireEvent.click(screen.getByText("back"));
  expect(back).toHaveBeenCalledTimes(1);
});
