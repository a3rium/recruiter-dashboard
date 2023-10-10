"use client";

import { PROSPECT_STATUS, Prospect } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type prospectContextType = {
  prospect: Prospect | undefined | null;
  setCurrentProspect: (prospect: Prospect) => void;
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
  },
  setCurrentProspect: () => {},
};

const ProspectContext = createContext<prospectContextType>(
  prospectContextDefaultValues,
);

type ProspectContextProps = {
  children: React.ReactNode;
};

export const ProspectProvider = ({ children }: ProspectContextProps) => {
  const [prospect, setProspect] = useState<Prospect>();
  const setCurrentProspect = (prospect: Prospect) => {
    setProspect(prospect);
  };
  const value = {
    prospect: prospect,
    setCurrentProspect,
  };
  return (
    <ProspectContext.Provider value={value}>
      {children}
    </ProspectContext.Provider>
  );
};

export const useProspectContext = () => useContext(ProspectContext);
