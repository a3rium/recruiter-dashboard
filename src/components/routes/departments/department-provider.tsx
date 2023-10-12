"use client";

import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext, useState } from "react";

type departmentItemType =
  inferRouterOutputs<AppRouter>["helper"]["getDepartmentList"]["departmentList"][0];

type departmentContextType = {
  department?: departmentItemType;
  setCurrentDepartment: (department: departmentItemType | undefined) => void;
};

const departmentContextDefaultValues: departmentContextType = {
  department: {
    id: 0,
    name: "",
  },
  setCurrentDepartment: () => {},
};

const DepartmentContext = createContext<departmentContextType>(
  departmentContextDefaultValues,
);

type DepartmentContextProps = {
  children: React.ReactNode;
};

export const DepartmentProvider = ({ children }: DepartmentContextProps) => {
  const [department, setDepartment] = useState<departmentItemType>();
  const setCurrentDepartment = (department: departmentItemType | undefined) => {
    setDepartment(department);
  };
  const value = {
    department,
    setCurrentDepartment,
  };
  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartmentContext = () => useContext(DepartmentContext);
