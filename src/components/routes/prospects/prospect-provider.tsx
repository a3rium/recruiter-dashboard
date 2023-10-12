"use client";

import { AppRouter } from "@/server";
import { PROSPECT_STATUS } from "@prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type prospectItemType =
  inferRouterOutputs<AppRouter>["prospects"]["getProspectTableData"]["prospectTableData"][0];

type prospectContextType = {
  prospect?: prospectItemType;
  setCurrentProspect: (prospect: prospectItemType | undefined) => void;
};

const prospectContextDefaultValues: prospectContextType = {
  prospect: {
    employeeId: 0,
    firstName: "",
    id: 0,
    joinedAt: new Date(),
    lastName: "",
    recruiterId: 0,
    requestId: 0,
    source: "",
    status: PROSPECT_STATUS.OPEN,
    recruiter: { id: 0, firstName: "", lastName: "" },
  },
  setCurrentProspect: () => {},
};

const ProspectContext = createContext<prospectContextType>(
  prospectContextDefaultValues,
);

export const ProspectProvider = ({ children }: PropsWithChildren) => {
  const [prospect, setProspect] = useState<prospectItemType>();
  const setCurrentProspect = (prospect: prospectItemType | undefined) => {
    setProspect(prospect);
  };
  const value = {
    prospect,
    setCurrentProspect,
  };
  return (
    <ProspectContext.Provider value={value}>
      {children}
    </ProspectContext.Provider>
  );
};

export const useProspectContext = () => useContext(ProspectContext);
