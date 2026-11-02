import { renderHook, act } from "@testing-library/react";
import { useCart } from "../hooks/hook";

const phone = { model: "iPhone", CompanyName: "Apple", price: 1000 };
const galaxy = { model: "Galaxy", CompanyName: "Samsung", price: 800 };

test("toggle adds a phone to the cart", () => {
  const { result } = renderHook(() => useCart());
  act(() => result.current.toggle(phone));

  expect(result.current.selectedModel).toEqual([phone]);
  expect(result.current.cartItems[phone.model]).toBe(true);
  expect(result.current.totalproducts).toBe(1);
});

test("toggle removes the phone when selected again", () => {
  const { result } = renderHook(() => useCart());
  act(() => result.current.toggle(phone));
  act(() => result.current.toggle(phone));

  expect(result.current.selectedModel).toEqual([]);
  expect(result.current.cartItems[phone.model]).toBe(false);
  expect(result.current.totalproducts).toBe(0);
});

test("add increments quantity only when item is in cart", () => {
  const { result } = renderHook(() => useCart());

  act(() => result.current.add(phone));
  expect(result.current.selectedNumber[phone.model]).toBeUndefined();

  act(() => result.current.toggle(phone));
  act(() => result.current.add(phone));
  expect(result.current.selectedNumber[phone.model]).toBe(2);
  expect(result.current.totalproducts).toBe(2);
});

test("sub decrements quantity but not below 1", () => {
  const { result } = renderHook(() => useCart());
  act(() => result.current.toggle(phone));
  act(() => result.current.add(phone));
  act(() => result.current.sub(phone));
  expect(result.current.selectedNumber[phone.model]).toBe(1);

  act(() => result.current.sub(phone));
  expect(result.current.selectedNumber[phone.model]).toBe(1);
  expect(result.current.totalproducts).toBe(1);
});

test("removing from cart resets quantity and subtracts full qty from total", () => {
  const { result } = renderHook(() => useCart());
  act(() => result.current.toggle(phone));
  act(() => result.current.add(phone));
  act(() => result.current.add(phone));
  act(() => result.current.toggle(phone));

  expect(result.current.cartItems[phone.model]).toBe(false);
  expect(result.current.selectedNumber[phone.model]).toBe(1);
  expect(result.current.totalproducts).toBe(0);
});

test("handlesearch filters case-insensitively by company or model", () => {
  const { result } = renderHook(() => useCart());
});
