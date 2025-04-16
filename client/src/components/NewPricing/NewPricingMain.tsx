import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ServicesAutocomplete from "./ServicesAutocomplete";
import { PricingFacial } from "../../interfaces/PricingFacial";
import { PricingAddOn } from "../../interfaces/PricingAddOn";
import SelectedServiceTable from "./SelectedServiceTable";

const NewPricingMain = () => {
  const [servicesLoading, setServicesLoading] = useState(false);
  const [facials, setFacials] = useState<PricingFacial[]>([]);
  const [addOns, setAddOns] = useState<PricingAddOn[]>([]);

  const [selectedService, setSelectedService] = useState<
    PricingFacial | PricingAddOn | null
  >(null);

  const handleChangeSelectedService = (key: string) => {
    const allServices = [...facials, ...addOns];
    const selectedService = allServices.find((service) => service.name === key);
    if (selectedService) setSelectedService(selectedService);
  };

  const queryServices = useCallback(async () => {
    setServicesLoading(true);
    const servicesData = await axios
      .get(
        `${
          process.env.REACT_APP_NODE_ENV === "production"
            ? "https://glow-labs-pros.onrender.com"
            : "http://localhost:4000"
        }/newPricing`
      )
      .then((res) => res.data)
      .catch((e) => console.error(e));
    if (servicesData) {
      setFacials(servicesData.facials);
      setAddOns(servicesData.addOns);
    }
    setServicesLoading(false);
  }, []);

  useEffect(() => {
    queryServices();
  }, [queryServices]);

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      style={{
        padding: "1rem",
        paddingBottom: "6rem",
      }}
    >
      <ServicesAutocomplete
        facials={facials}
        addOns={addOns}
        servicesLoading={servicesLoading}
        handleChangeSelectedService={handleChangeSelectedService}
      />
      <SelectedServiceTable selectedService={selectedService} />
    </div>
  );
};

export default NewPricingMain;
