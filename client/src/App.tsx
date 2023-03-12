import React, { ChangeEvent, useState } from "react";
import { Form, FormGroup, FormText, Input } from "reactstrap";
import useDebounce from "./hooks/useDebounce";
import { SearchResults } from "./components/SearchResults";
import Logo from "./assets/GlowLabsLogo.svg";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [debouncedAllergen, setDebouncedAllergen] = useState("");

  useDebounce(
    () => {
      setDebouncedAllergen(search);
    },
    [search],
    500
  );

  const handleSearch = (e: ChangeEvent) =>
    setSearch((e.target as HTMLInputElement).value);

  return (
    <div className="App">
      <h1>
        <img src={Logo.toString()} alt="Glow Labs Logo" />
        <br />
        Product Ingredient Search
      </h1>
      <Form className="ingredient_search_form">
        <FormGroup>
          <Input
            className="ingredient_search_bar"
            autoFocus
            id="search"
            type="text"
            spellCheck="true"
            value={search || ""}
            onChange={handleSearch}
          />
          <FormText>
            {debouncedAllergen ? <></> : "Search for an ingredient here."}
          </FormText>
        </FormGroup>
        <SearchResults ingredient={debouncedAllergen} />
      </Form>
    </div>
  );
};

export default App;
