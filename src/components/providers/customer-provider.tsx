"use client";

import { Customer } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type customerContextType = {
  customer?: Customer;
  setCurrentCustomer: (customer: Customer | undefined) => void;
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
  const [customer, setCustomer] = useState<Customer>();
  const setCurrentCustomer = (customer: Customer | undefined) => {
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
