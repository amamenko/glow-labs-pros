import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/react";
import { PricingFacial } from "../../interfaces/PricingFacial";
import { PricingAddOn } from "../../interfaces/PricingAddOn";
import { ClipLoader } from "react-spinners";
import { Key, useState } from "react";

interface ServicesAutocompleteProps {
  facials: PricingFacial[];
  addOns: PricingAddOn[];
  servicesLoading: boolean;
  handleChangeSelectedService: (key: string) => void;
}

const ServicesAutocomplete = ({
  facials,
  addOns,
  servicesLoading,
  handleChangeSelectedService,
}: ServicesAutocompleteProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleOnSelectionChange = (key: Key) => {
    setSelectedKey(key as string);
    handleChangeSelectedService(key as string);
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      {servicesLoading ? (
        <div
          className="w-full max-w-md flex justify-start items-center absolute z-50"
          style={{
            marginLeft: "10rem",
            marginTop: "0.25rem",
          }}
        >
          <ClipLoader color={"#000"} loading={true} size={20} />
        </div>
      ) : null}
      <Autocomplete
        className="max-w-xl"
        label="Services"
        placeholder={servicesLoading ? "" : "Search for a service"}
        disabled={servicesLoading}
        style={{
          color: "#000",
        }}
        selectedKey={selectedKey}
        onSelectionChange={handleOnSelectionChange}
      >
        <AutocompleteSection showDivider title="FACIALS">
          {facials.map((facial) => (
            <AutocompleteItem key={facial.name}>{facial.name}</AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection title="ADD-ONS">
          {addOns.map((addOn) => (
            <AutocompleteItem key={addOn.name}>{addOn.name}</AutocompleteItem>
          ))}
        </AutocompleteSection>
      </Autocomplete>
    </div>
  );
};

export default ServicesAutocomplete;
