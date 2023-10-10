"use client";

import { Department } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type departmentContextType = {
  department?: Department;
  setCurrentDepartment: (department: Department | undefined) => void;
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
  const [department, setDepartment] = useState<Department>();
  const setCurrentDepartment = (department: Department | undefined) => {
    if (department) setDepartment(department);
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
