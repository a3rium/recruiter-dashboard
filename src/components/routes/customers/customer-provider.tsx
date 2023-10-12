"use client";

import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext, useState } from "react";

type customerItemType =
  inferRouterOutputs<AppRouter>["helper"]["getCustomerList"]["customerList"][0];

type customerContextType = {
  customer?: customerItemType;
  setCurrentCustomer: (customer: customerItemType | undefined) => void;
};

const customerContextDefaultValues: customerContextType = {
  customer: {
    id: 0,
    name: "",
  },
  setCurrentCustomer: () => {},
};

const CustomerContext = createContext<customerContextType>(
  customerContextDefaultValues,
);

type CustomerContextProps = {
  children: React.ReactNode;
};

export const CustomerProvider = ({ children }: CustomerContextProps) => {
  const [customer, setCustomer] = useState<customerItemType>();
  const setCurrentCustomer = (customer: customerItemType | undefined) => {
    if (customer) setCustomer(customer);
  };
  const value = {
    customer,
    setCurrentCustomer,
  };
  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);
