import React, { useContext, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { FilterContext } from "../../../context/FilterContext";

interface FilterDropdownProps {
  filterName: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  name: string;
  options: string[];
}

export const FilterDropdown = ({
  filterName,
  color,
  name,
  options,
}: FilterDropdownProps) => {
  const {
    debouncedAllergen,
    currentSelectedFilters,
    setCurrentSelectedFilters,
    changeSearchLoading,
    changeProductData,
  } = useContext(FilterContext);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const extractValueFromKey = (key: any) => {
    return Array.from(key).join(", ").replaceAll("_", " ");
  };

  const selectedValue = useMemo(
    () => extractValueFromKey(selectedKeys),
    [selectedKeys]
  );

  const searchForProductsWithFilter = async (filters: {
    [key: string]: string[];
  }) => {
    changeSearchLoading(true);
    const allergenData = await axios
      .get(
        `${
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://glow-labs-pros.onrender.com"
            : "http://localhost:4000"
        }/allergies/${debouncedAllergen || ""}${
          filters ? `?filters=${JSON.stringify(filters)}` : ""
        }`
      )
      .then((res) => res.data)
      .catch((e) => console.error(e));
    if (allergenData) changeProductData(allergenData);
    changeSearchLoading(false);
  };

  const handleChangeKey = async (keys: any) => {
    const value = extractValueFromKey(keys);

    if (selectedValue) {
      if (value === selectedValue) {
        setSelectedKeys(new Set([]));
        const modifiedSelectedFilters = {
          ...currentSelectedFilters,
          [filterName]: [],
        };
        setCurrentSelectedFilters(modifiedSelectedFilters);
        await searchForProductsWithFilter(modifiedSelectedFilters);
      } else {
        setSelectedKeys(keys as any);
        const modifiedFilters = {
          ...currentSelectedFilters,
          [filterName]: [value],
        };
        setCurrentSelectedFilters(modifiedFilters);
        await searchForProductsWithFilter(modifiedFilters);
      }
    } else {
      setSelectedKeys(keys as any);
      const modifiedFilters = {
        ...currentSelectedFilters,
        [filterName]: [value],
      };
      setCurrentSelectedFilters(modifiedFilters);
      await searchForProductsWithFilter(modifiedFilters);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant={selectedValue ? "solid" : "bordered"}
          color={color}
          className="capitalize text-white"
        >
          {selectedValue || name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        classNames={{
          list: "pl-0 pb-0 overflow-auto",
        }}
        style={{
          maxHeight: "250px",
        }}
        aria-label="Filter dropdown menu"
        variant="solid"
        color={color}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys: any) => handleChangeKey(keys)}
        topContent={
          <p
            className="flex text-base text-left border-b border-gray-600 mb-1 pb-2 pt-1"
            style={{
              background: "rgb(230, 230, 230)",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            {name}
          </p>
        }
      >
        {
          options.map((option) => (
            <DropdownItem key={option}>{option}</DropdownItem>
          )) as any
        }
      </DropdownMenu>
    </Dropdown>
  );
};
