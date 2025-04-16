import React from "react";
import { PricingFacial } from "../../interfaces/PricingFacial";
import { PricingAddOn } from "../../interfaces/PricingAddOn";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PricingCreditCell from "./PricingCreditCell";

interface SelectedServiceTableProps {
  selectedService: PricingFacial | PricingAddOn | null;
}

const SelectedServiceTable = ({
  selectedService,
}: SelectedServiceTableProps) => {
  if (!selectedService) return <></>;

  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      style={{
        marginTop: "2rem",
      }}
    >
      <div className="w-full flex flex-row justify-center items-center gap-x-4">
        <p className="text-sm m-0 p-0 mb-0">{selectedService.name}</p>
        <Chip
          color={selectedService.type === "facial" ? "primary" : "warning"}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          <span className="font-semibold">
            {selectedService.type?.toUpperCase()}
          </span>
        </Chip>
      </div>
      <Table aria-label="Services pricing table" className="max-w-3xl mt-4">
        <TableHeader>
          <TableColumn className="text-black font-bold text-center">
            STANDARD
          </TableColumn>
          <TableColumn className="text-black font-bold text-center">
            CLASSIC 110
          </TableColumn>
          <TableColumn className="text-black font-bold text-center">
            LUX 200
          </TableColumn>
          <TableColumn className="text-black font-bold text-center">
            VIP 300
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-black font-semibold text-xl">
              ${selectedService.standard}
            </TableCell>
            <TableCell className="text-black font-semibold text-xl">
              ${selectedService.classic110}
            </TableCell>
            <TableCell className="text-black font-semibold text-xl">
              ${selectedService.lux200}
            </TableCell>
            <TableCell className="text-black font-semibold text-xl">
              ${selectedService.vip300}
            </TableCell>
          </TableRow>
          {selectedService.type === "facial" ? (
            <TableRow key="2">
              <TableCell className="text-black text-2xl">
                <></>
              </TableCell>
              <TableCell className="text-black text-2xl">
                <PricingCreditCell
                  creditValue={selectedService.oweCreditClassic}
                />
              </TableCell>
              <TableCell className="text-black text-2xl">
                <PricingCreditCell creditValue={selectedService.oweCreditLux} />
              </TableCell>
              <TableCell className="text-black text-2xl">
                <PricingCreditCell creditValue={selectedService.oweCreditVip} />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow
              style={{
                display: "none",
              }}
            >
              <TableCell>
                <div></div>
              </TableCell>
              <TableCell>
                <div></div>
              </TableCell>
              <TableCell>
                <div></div>
              </TableCell>
              <TableCell>
                <div></div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectedServiceTable;
