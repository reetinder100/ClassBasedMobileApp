import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { PhoneCard, PhoneDetail, Button1, PhoneImage } from "./styling";
import { Button2 } from "./styling";
import { Layout } from "./styling";
import { Container } from "./styling";
import { Cart } from "./styling";
import { Cartfunc } from "./Cart";
import { Header } from "./Header";
import { phones } from "./data";
import Footer from "./footer";

export const ModalDataContext = createContext(null);

export default function PhoneList() {
  const [selectedModel, setSelectedModel] = useState([]);
  const [selectedNumber, setselectedNumber] = useState({});
  const [showCart, setshowCart] = useState(false);
  const [text, settext] = useState("Add to Cart");
  const [cartItems, setcartItems] = useState({});
  const [filteredlist, setfilteredlist] = useState(phones);
  const [totalproducts, settotalproducts] = useState(0);

  const add = (phone) => {
    if (cartItems[phone.model]) {
      setselectedNumber((prev) => ({
        ...prev,
        [phone.model]: (prev[phone.model] || 1) + 1,
      }));
    }
    settotalproducts(totalproducts + 1);
  };

  const sub = (phone) => {
    if (cartItems[phone.model]) {
      setselectedNumber((prev) => ({
        ...prev,
        [phone.model]: (prev[phone.model] || 1) - 1,
      }));
    }
    settotalproducts(totalproducts - 1);
  };

  const handleSelect = (phone) => {
    if (buttonTextValue(phone) == "Add to Cart") {
      setSelectedModel((prev) => {
        return [...prev, phone];
      });
      settotalproducts(totalproducts + 1);
    } else if (buttonTextValue(phone) == "Remove from cart") {
      setSelectedModel((prev) =>
        prev.filter((item) => item.model !== phone.model),
      );

      setselectedNumber((prev) => ({
        ...prev,
        [phone.model]: 1,
      }));
      settotalproducts(totalproducts - (selectedNumber[phone.model] || 1));
    }

    setcartItems((prev) => {
      if (prev[phone.model]) return { ...prev, [phone.model]: false };
      else {
        return { ...prev, [phone.model]: true };
      }
    });
  };

  const buttonTextValue = (val) => {
    if (cartItems[val.model]) {
      return "Remove from cart";
    } else {
      return "Add to Cart";
    }
  };

  const handlecart = () => {
    setshowCart(true);
  };

  const handleback = () => {
    setshowCart(false);
  };

  const handlesearch = (searchTerm) => {
    setfilteredlist(
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
          handleSelect,
          add,
          sub,
          cartItems,
        }}
      >
        <Header
          showCart={handlecart}
          back={handleback}
          onsearch={handlesearch}
        ></Header>

        {showCart && <Cartfunc />}

        {!showCart && (
          <Container>
            {filteredlist.map((phone) => (
              <PhoneCard>
                <PhoneImage src={phone.image} />

                <PhoneDetail>Company: {phone.CompanyName}</PhoneDetail>
                <PhoneDetail>Model: {phone.model}</PhoneDetail>
                <PhoneDetail>Price: {phone.price}</PhoneDetail>

                <Layout>
                  <Button1 onClick={() => handleSelect(phone)}>
                    {buttonTextValue(phone)}
                  </Button1>
                  <Button2
                    onClick={() => sub(phone)}
                    disabled={!cartItems[phone.model]}
                  >
                    -
                  </Button2>
                  <Button2
                    onClick={() => add(phone)}
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
