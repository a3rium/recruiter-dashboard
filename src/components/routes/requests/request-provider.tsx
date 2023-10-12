"use client";

import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext, useState } from "react";

type requestItemType =
  inferRouterOutputs<AppRouter>["requests"]["getRequestTableData"]["requestTableData"][0];

type requestContextType = {
  request?: requestItemType;
  setCurrentRequest: (request: requestItemType) => void;
};

const requestContextDefaultValues: requestContextType = {
  request: {
    budgetOpen: false,
    budgetValue: 0,
    createdAt: new Date(),
    customerId: 0,
    departmentId: 0,
    id: 0,
    level: "",
    position: "",
    requesterId: 0,
    customer: { id: 0, name: "" },
    department: { id: 0, name: "" },
    requester: { id: 0, firstName: "", lastName: "" },
  },
  setCurrentRequest: () => {},
};

const RequestContext = createContext<requestContextType>(
  requestContextDefaultValues,
);

type RequestContextProps = {
  children: React.ReactNode;
};

export const RequestProvider = ({ children }: RequestContextProps) => {
  const [request, setRequest] = useState<requestItemType>();
  const setCurrentRequest = (request: requestItemType) => {
    setRequest(request);
  };
  const value = {
    request,
    setCurrentRequest,
  };
  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

export const useRequestContext = () => useContext(RequestContext);
