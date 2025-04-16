import React, { useCallback } from "react";
import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";

interface PricingCreditCellProps {
  creditValue: number;
}

const PricingCreditCell = ({ creditValue }: PricingCreditCellProps) => {
  const renderPlusMinusDollarSign = (value: number): string => {
    const isZero = !value;
    const absoluteValue = Math.abs(value);

    if (isZero) {
      return "Included with tier!";
    } else {
      return `$${absoluteValue}`;
    }
  };

  const renderTooltipText = useCallback(() => {
    return creditValue === 0 || creditValue === undefined
      ? "Already included in the tier!"
      : creditValue < 0
      ? "Monetary credit added to account in Square and member software"
      : "Total they owe in addition to a membership credit used";
  }, [creditValue]);

  return (
    <Tooltip
      content={renderTooltipText()}
      showArrow={true}
      placement="bottom"
      className="text-xl font-semibold p-3 z-0"
    >
      <div className="w-full items-center justify-center flex">
        <Card
          className="relative items-center justify-center w-full"
          style={{
            minHeight: "8rem",
            minWidth: "10rem",
            maxWidth: "12rem",
          }}
        >
          <CardHeader className="w-full font-semibold absolute top-0 left-0 right-0 mx-auto self-center items-center justify-center flex">
            {creditValue ? (
              <span
                style={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                  fontWeight: 700,
                  color: creditValue > 0 ? "red" : "blue",
                }}
              >
                {creditValue > 0 ? "OWE" : "CREDIT"}
              </span>
            ) : (
              <></>
            )}
          </CardHeader>
          <CardBody className="flex flex-col items-center justify-center">
            <span
              className="text-3xl"
              style={{
                fontWeight: 800,
                textAlign: "center",
                color:
                  creditValue === undefined || creditValue === 0
                    ? "black"
                    : creditValue > 0
                    ? "red"
                    : "blue",
              }}
            >
              {renderPlusMinusDollarSign(creditValue)}
            </span>
          </CardBody>
        </Card>
      </div>
    </Tooltip>
  );
};

export default PricingCreditCell;
