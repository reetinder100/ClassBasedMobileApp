import React, { Component } from "react";
import { PhoneCard, PhoneDetail, Button1, PhoneImage } from "../styling";
import { Button2 } from "../styling";
import { Layout } from "../styling";
import { Container } from "../styling";
import { Cartfunc } from "../cart/cart";
import { Header } from "../header";
import { phones } from "../data/data";
import Footer from "../headerAndFooter/footer";
import { ModalDataContext } from "../modaldataContext";

export default class PhoneList extends Component {
  state = {
    selectedModel: [],
    selectedNumber: {},
    showCart: false,
    cartItems: {},
    filteredlist: phones,
    totalproducts: 0,
  };

  add = (phone) => {
    const { cartItems, selectedNumber, totalproducts } = this.state;

    if (cartItems[phone.model]) {
      this.setState({
        selectedNumber: {
          ...selectedNumber,
          [phone.model]: (selectedNumber[phone.model] || 1) + 1,
        },
      });
    }
    this.setState({ totalproducts: totalproducts + 1 });
  };

  sub = (phone) => {
    const { cartItems, selectedNumber, totalproducts } = this.state;

    if (cartItems[phone.model]) {
      this.setState({
        selectedNumber: {
          ...selectedNumber,
          [phone.model]: (selectedNumber[phone.model] || 1) - 1,
        },
      });
    }
    this.setState({ totalproducts: totalproducts - 1 });
  };

  handleSelect = (phone) => {
    const { selectedNumber, cartItems, totalproducts } = this.state;
    const text = this.buttonTextValue(phone);

    if (text === "Add to Cart") {
      this.setState((prevState) => ({
        selectedModel: [...prevState.selectedModel, phone],
        totalproducts: prevState.totalproducts + 1,
      }));
    } else if (text === "Remove from cart") {
      this.setState((prevState) => ({
        selectedModel: prevState.selectedModel.filter(
          (item) => item.model !== phone.model,
        ),
        selectedNumber: {
          ...prevState.selectedNumber,
          [phone.model]: 1,
        },
        totalproducts:
          prevState.totalproducts -
          (prevState.selectedNumber[phone.model] || 1),
      }));
    }

    this.setState((prevState) => {
      if (prevState.cartItems[phone.model]) {
        return { cartItems: { ...prevState.cartItems, [phone.model]: false } };
      } else {
        return { cartItems: { ...prevState.cartItems, [phone.model]: true } };
      }
    });
  };

  buttonTextValue = (val) => {
    if (this.state.cartItems[val.model]) {
      return "Remove from cart";
    } else {
      return "Add to Cart";
    }
  };

  handlecart = () => {
    this.setState({ showCart: true });
  };

  handleback = () => {
    this.setState({ showCart: false });
  };

  handlesearch = (searchTerm) => {
    this.setState({
      filteredlist: phones.filter(
        (phone) =>
          phone.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phone.model.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    });
  };

  render() {
    const {
      selectedModel,
      selectedNumber,
      totalproducts,
      showCart,
      cartItems,
      filteredlist,
    } = this.state;

    return (
      <div>
        <ModalDataContext.Provider
          value={{
            selectedModel,
            selectedNumber,
            totalproducts,
            buttonTextValue: this.buttonTextValue,
            handleSelect: this.handleSelect,
            add: this.add,
            sub: this.sub,
            cartItems,
          }}
        >
          <Header
            showCart={this.handlecart}
            back={this.handleback}
            onsearch={this.handlesearch}
          ></Header>

          {showCart && <Cartfunc />}

          {!showCart && (
            <Container>
              {filteredlist.map((phone) => (
                <PhoneCard key={phone.model}>
                  <PhoneImage src={phone.image} />

                  <PhoneDetail>Company: {phone.CompanyName}</PhoneDetail>
                  <PhoneDetail>Model: {phone.model}</PhoneDetail>
                  <PhoneDetail>Price: {phone.price}</PhoneDetail>

                  <Layout>
                    <Button1 onClick={() => this.handleSelect(phone)}>
                      {this.buttonTextValue(phone)}
                    </Button1>
                    <Button2
                      onClick={() => this.sub(phone)}
                      disabled={!cartItems[phone.model]}
                    >
                      -
                    </Button2>
                    <Button2
                      onClick={() => this.add(phone)}
                      disabled={!cartItems[phone.model]}
                    >
                      +
                    </Button2>
                  </Layout>
                </PhoneCard>
              ))}
            </Container>
          )}
        </ModalDataContext.Provider>
        <Footer />
      </div>
    );
  }
}
