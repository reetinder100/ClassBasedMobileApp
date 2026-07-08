import { FooterContainer } from "./styling";
import { FooterLinks } from "./styling";

const Footer = ({ hasCart = false }) => {
  return (
    <FooterContainer hasCart={hasCart}>
      <h3 style={{ margin: 0, color: "white" }}>📱 PhoneStore</h3>
      <FooterLinks>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Blog</a>
      </FooterLinks>
      <p style={{ color: "#718096", fontSize: "13px", margin: "10px 0 0" }}>
        © 2024 PhoneStore. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
