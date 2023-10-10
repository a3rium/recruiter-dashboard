"use client";

import { Request } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type requestContextType = {
  request: Request | undefined | null;
  setCurrentRequest: (request: Request) => void;
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
  const [request, setRequest] = useState<Request>();
  const setCurrentRequest = (request: Request) => {
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
