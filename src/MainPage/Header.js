import React, { Component } from "react";

import { Iconbuttons } from "./styling";
import { HeaderStyle } from "./styling";
import { SearchInput } from "./styling";

export class Header extends Component {
  state = {
    searchTerm: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ searchTerm: value });
    this.props.onsearch(value);
  };

  render() {
    const { showCart, back } = this.props;
    const { searchTerm } = this.state;

    return (
      <HeaderStyle>
        <h1>MobileSoft</h1>

        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={this.handleChange}
        />

        <Iconbuttons>
          <button onClick={showCart}>
            <img src="shopping-cart.png" alt="image" width="50" height="50" />
          </button>
          <button onClick={back}>back</button>
        </Iconbuttons>
      </HeaderStyle>
    );
  }
}
