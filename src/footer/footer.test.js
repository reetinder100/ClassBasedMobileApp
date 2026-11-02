import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../footer";

test("renders the brand name", () => {
  render(<Footer />);
  expect(screen.getByText("📱 PhoneStore")).toBeInTheDocument();
});

test("renders all footer links", () => {
  render(<Footer />);
  ["About", "Contact", "Privacy", "Terms", "Blog"].forEach((label) => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});

test("renders the copyright notice", () => {
  render(<Footer />);
  expect(
    screen.getByText("© 2024 PhoneStore. All rights reserved."),
  ).toBeInTheDocument();
});

test("renders without a hasCart prop", () => {
  // default hasCart = false must not throw
  expect(() => render(<Footer />)).not.toThrow();
});

test("accepts hasCart=true without crashing", () => {
  expect(() => render(<Footer hasCart={true} />)).not.toThrow();
});
