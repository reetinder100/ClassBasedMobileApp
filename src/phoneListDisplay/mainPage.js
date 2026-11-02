import React, { Component } from "react";
import {
  PhoneCard,
  PhoneDetail,
  Button1,
  PhoneImage,
  Layout,
  Container,
} from "../styling";
import { Cartfunc } from "../cart/cart";
import { Header } from "../header/header";
import { phones } from "../data/data";
import Footer from "../footer/footer";
import { ModalDataContext } from "../modaldataContext";
import QuantityButtons from "../component/addSubcomponent";
import { useCart } from "../hooks/hook";

const PhoneListInner = () => {
  const {
    cartItems,
    selectedNumber,
    selectedModel,
    totalproducts,
    add,
    sub,
    toggle,
    buttonTextValue,
  } = useCart();

  const [showCart, setShowCart] = React.useState(false);
  const [filteredlist, setFilteredlist] = React.useState(phones);

  const handlecart = () => setShowCart(true);
  const handleback = () => setShowCart(false);

  const handlesearch = (searchTerm) => {
    setFilteredlist(
      phones.filter(
        (phone) =>
          phone.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phone.model.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  return (
    <div>
      <ModalDataContext.Provider
        value={{
          selectedModel,
          selectedNumber,
          totalproducts,
          buttonTextValue,
          handleSelect: toggle,
          add,
          sub,
          cartItems,
        }}
      >
        <Header
          showCart={handlecart}
          back={handleback}
          onsearch={handlesearch}
        />

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
                  <Button1 onClick={() => toggle(phone)}>
                    {buttonTextValue(phone)}
                  </Button1>
                  <QuantityButtons
                    onAdd={() => add(phone)}
                    onSub={() => sub(phone)}
                    disabled={!cartItems[phone.model]}
                    quantity={selectedNumber[phone.model] || 0}
                  />
                </Layout>
              </PhoneCard>
            ))}
          </Container>
        )}
      </ModalDataContext.Provider>
      <Footer />
    </div>
  );
};

export default function PhoneList() {
  return <PhoneListInner />;
}
