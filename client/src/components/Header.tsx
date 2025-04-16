import React from "react";
import Logo from "../assets/GlowLabsLogo.svg";
import { useLocation } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { useWindowWidth } from "@react-hook/window-size";

const Header = () => {
  const location = useLocation();
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768;

  const getHeaderText = () => {
    switch (location.pathname) {
      case "/":
        return "Product Ingredient Search";
      case "/pricing":
        return "New Pricing Tool";
      default:
        return "";
    }
  };

  return (
    <div>
      <div
        className="w-fit self-start flex-1 absolute"
        style={{
          top: "1rem",
          left: "1rem",
        }}
      >
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              <FaCog color="#fff" />{" "}
              <span className="text-white">Other Glow Labs Tools</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="App config dropdown menu" variant="faded">
            <DropdownSection showDivider={true} title="Versioning">
              <DropdownItem
                as={Link}
                href="/"
                key="productIngredients"
                description={
                  <Link
                    to="/"
                    className="no-underline w-full h-full text-black dark:text-white"
                  >
                    See allergens and ingredients in Glow Labs skincare products
                  </Link>
                }
                className="no-underline"
              >
                <Link to="/" className="no-underline w-full h-full">
                  Product Ingredients
                </Link>
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/pricing"
                key="pricing"
                description={
                  <Link
                    to="/pricing"
                    className="no-underline w-full h-full text-black dark:text-white"
                  >
                    View new pricing for services across tiers
                  </Link>
                }
                className="no-underline"
              >
                <Link to="/newPricing" className="no-underline w-full h-full">
                  New Pricing
                </Link>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <h1 className="text-center flex flex-col items-center justify-center">
        <img
          className="mr-2"
          src={Logo.toString()}
          alt="Glow Labs Logo"
          style={{
            minHeight: isSmallScreen ? "3rem" : "4rem",
          }}
        />
        <br />
        {getHeaderText()}
      </h1>
    </div>
  );
};

export default Header;
