"use client";

import { InterviewData } from "@/lib/types/interview-with-data.type";
import { createContext, useContext, useState } from "react";

type interviewContextType = {
  interviewData?: InterviewData;
  setCurrentInterviewData: (interviewData: InterviewData | undefined) => void;
};

const interviewContextDefaultValues: interviewContextType = {
  interviewData: {
    conductedAt: new Date(),
    id: 0,
    prospectId: 0,
    remarks: "",
    interviewers: [{ id: 0, firstName: "", lastName: "" }],
    prospect: {
      id: 0,
      firstName: "",
      lastName: "",
    },
  },
  setCurrentInterviewData: () => {},
};

const InterviewContext = createContext<interviewContextType>(
  interviewContextDefaultValues,
);

type InterviewContextProps = {
  children: React.ReactNode;
};

export const InterviewProvider = ({ children }: InterviewContextProps) => {
  const [interviewData, setInterviewData] = useState<InterviewData>();
  const setCurrentInterviewData = (
    interviewData: InterviewData | undefined,
  ) => {
    if (interviewData) setInterviewData(interviewData);
  };
  const value = {
    interviewData,
    setCurrentInterviewData,
  };
  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => useContext(InterviewContext);
