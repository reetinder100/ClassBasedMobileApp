import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 0px;
  }
`;

export const PhoneCard = styled.div`
  margin-top: 80px;
  width: 400px;
  height: 370px;
  padding: 20px;
  background: #f0f2f5;
  border-radius: 8px;
  margin-bottom: 15px;
  list-style-type: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PhoneDetail = styled.li`
  font-family: sans-serif;
  color: #333;
  margin: 5px 0;

  strong {
    color: #0077e6;
  }
`;

export const Button1 = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

export const Button2 = styled.button`
  color: black;
  border: none;
  padding: 10px;
  font-size: 20px;
  margin-top: 10px;
  width: 20%;
  border-radius: 6px;
  cursor: pointer;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Cart = styled.div`
  width: 60%;
  margin-bottom: 20px;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eef2f6;

  h1 {
    margin-top: 80px;
    font-size: 20px;
    margin-bottom: 16px;
    color: #1a202c;
  }

  p {
    margin: 8px 0;
    color: #4a5568;
  }
`;

export const HeaderStyle = styled.div`
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  position: fixed;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > :first-child {
    margin-left: 80px;
  }

  > :last-child {
    margin-right: 80px;
  }
`;

export const Iconbuttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  button {
    background: linear-gradient(135deg, #c8cde1 0%, #b59bd0 100%);
    color: black;
    border: none;
    padding: 10px;
    font-size: 20px;
    font-weight: 300;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
  }
`;

export const PhoneImage = styled.img`
  width: 230px;
  height: 230px;
  object-fit: contain;
  margin: 0 auto 10px;
  display: block;
`;

export const SearchInput = styled.input`
  width: 50%;
  padding: 10px 20px;
  border: none;
  border-bottom: 2px solid #e2e8f0;
  font-size: 16px;
  background: transparent;
`;

export const CartSummary = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;

  h2 {
    margin: 0 0 15px 0;
    font-size: 18px;
    border-bottom: 2px solid #f0f2f5;
    padding-bottom: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
  }

  .total {
    font-weight: bold;
    font-size: 18px;
    border-top: 2px solid #f0f2f5;
    padding-top: 15px;
    margin-top: 5px;
  }

  @media (max-width: 1200px) {
    position: relative;
    right: 0;
    top: 0;
    width: 100%;
    margin: 20px 0;
  }
`;

export const FooterContainer = styled.footer`
  background: #1a202c;
  color: #a0aec0;
  padding: 30px 20px 15px;
  margin-top: 40px;
  margin-left: ${(props) => (props.hasCart ? "380px" : "0")};
  text-align: center;

  @media (max-width: 1200px) {
    margin-left: 0;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin: 15px 0;

  a {
    color: #a0aec0;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: #667eea;
    }
  }
`;
