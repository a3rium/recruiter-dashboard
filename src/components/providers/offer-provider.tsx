"use client";

import { OfferData } from "@/lib/types/offer-with-data.type";
import { OFFER_STATUS, Offer, Request } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type offerContextType = {
  offerData?: OfferData;
  setCurrentOfferData: (offerData: OfferData) => void;
};

const offerContextDefaultValues: offerContextType = {
  offerData: {
    ctcValue: 0,
    employeeId: 0,
    id: 0,
    offeredAt: new Date(),
    respondedAt: new Date(),
    prospectId: 0,
    status: OFFER_STATUS.SENT,
    offeredBy: { id: 0, firstName: "", lastName: "" },
    offeredTo: { id: 0, firstName: "", lastName: "" },
  },
  setCurrentOfferData: () => {},
};

const OfferContext = createContext<offerContextType>(offerContextDefaultValues);

type OfferContextProps = {
  children: React.ReactNode;
};

export const OfferProvider = ({ children }: OfferContextProps) => {
  const [offerData, setOfferData] = useState<OfferData>();
  const setCurrentOfferData = (offerData: OfferData) => {
    setOfferData(offerData);
  };
  const value = {
    offerData,
    setCurrentOfferData,
  };
  return (
    <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
