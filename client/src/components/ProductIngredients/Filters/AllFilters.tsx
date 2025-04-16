import { Fragment } from "react";
import { FilterDropdown } from "./FilterDropdown";

interface AllFiltersProps {
  filters: {
    productLine: {
      name: string;
      options: string[];
    };
    backbarRetail: {
      name: string;
      options: string[];
    };
    typeOfProduct: {
      name: string;
      options: string[];
    };
    recommended: {
      name: string;
      options: string[];
    };
    contraindications: {
      name: string;
      options: string[];
    };
  };
}

export const AllFilters = ({ filters }: AllFiltersProps) => {
  const colorsArr = ["primary", "secondary", "success", "warning", "danger"];

  return (
    <div
      className="flex flex-wrap w-full mx-4 gap-2 sm:gap-4 justify-start items-start my-4"
      style={{ maxWidth: "75%" }}
    >
      {Object.keys(filters).map((filter, i) => {
        const currentFilterKey = filter as keyof typeof filters;
        return (
          <Fragment key={i}>
            <FilterDropdown
              filterName={filter}
              color={
                colorsArr[i] as
                  | "primary"
                  | "secondary"
                  | "success"
                  | "warning"
                  | "danger"
              }
              name={filters[currentFilterKey].name}
              options={filters[currentFilterKey].options}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
