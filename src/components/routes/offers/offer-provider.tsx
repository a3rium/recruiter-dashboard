"use client";

import { AppRouter } from "@/server";
import { OFFER_STATUS } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type offerItemType =
  inferRouterOutputs<AppRouter>["offers"]["getOfferTableData"]["offerTableData"][0];

type offerContextType = {
  offer?: offerItemType;
  setCurrentOffer: (offer: offerItemType | undefined) => void;
};

const offerContextDefaultValues: offerContextType = {
  offer: {
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
  setCurrentOffer: () => {},
};

const OfferContext = createContext<offerContextType>(offerContextDefaultValues);

export const OfferProvider = ({ children }: PropsWithChildren) => {
  const [offer, setOffer] = useState<offerItemType>();
  const setCurrentOffer = (offer: offerItemType | undefined) => {
    setOffer(offer);
  };
  const value = {
    offer,
    setCurrentOffer,
  };
  return (
    <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);
