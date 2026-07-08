import React, { useState } from "react";

import { Iconbuttons } from "./styling";
import { HeaderStyle } from "./styling";
import { SearchInput } from "./styling";

export const Header = ({ showCart, back, onsearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <HeaderStyle>
      <h1>MobileSoft</h1>

      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onsearch(searchTerm);
        }}
      />

      <Iconbuttons>
        <button onClick={showCart}>
          <img src="shopping-cart.png" alt="image" width="50" height="50" />
        </button>
        <button onClick={back}>back</button>
      </Iconbuttons>
    </HeaderStyle>
  );
};
