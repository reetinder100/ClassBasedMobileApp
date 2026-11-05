import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuantityButtons } from "./QuantityButtons";

const renderButtons = (props = {}) =>
  render(
    <QuantityButtons
      onAdd={jest.fn()}
      onSub={jest.fn()}
      quantity={1}
      showQuantity={false}
      disableAdd={false}
      disableSub={false}
      {...props}
    />,
  );

test("renders enabled + and − buttons by default", () => {
  renderButtons();
  expect(screen.getByLabelText("Increase quantity")).toBeEnabled();
  expect(screen.getByLabelText("Decrease quantity")).toBeEnabled();
});

test("hides quantity by default and shows it when showQuantity is true", () => {
  const { rerender } = renderButtons({ quantity: 5 });
  expect(screen.queryByText("5")).not.toBeInTheDocument();

  rerender(
    <QuantityButtons
      onAdd={jest.fn()}
      onSub={jest.fn()}
      quantity={5}
      showQuantity
    />,
  );
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("clicking + and − calls onAdd and onSub respectively", () => {
  const onAdd = jest.fn();
  const onSub = jest.fn();
  renderButtons({ onAdd, onSub, quantity: 2 });

  fireEvent.click(screen.getByLabelText("Increase quantity"));
  fireEvent.click(screen.getByLabelText("Decrease quantity"));

  expect(onAdd).toHaveBeenCalledTimes(1);
  expect(onSub).toHaveBeenCalledTimes(1);
});

test("disabled buttons do not fire their handlers", () => {
  const onAdd = jest.fn();
  const onSub = jest.fn();
  renderButtons({ onAdd, onSub, disableAdd: true, disableSub: true });

  fireEvent.click(screen.getByLabelText("Increase quantity"));
  fireEvent.click(screen.getByLabelText("Decrease quantity"));

  expect(onAdd).not.toHaveBeenCalled();
  expect(onSub).not.toHaveBeenCalled();
});
