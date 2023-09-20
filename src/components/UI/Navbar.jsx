import React from "react";
import styles from "./Navbar.module.css";
import Container from "./Container.jsx";
import logo from "../../logo.svg";
import Button from "../Button/Button.jsx";
const Navbar = () => {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src={logo} />
          </div>
          <ul className={styles.list}>
            <Button size="md">Practice</Button>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
