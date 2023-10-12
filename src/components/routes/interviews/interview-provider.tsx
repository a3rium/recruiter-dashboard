"use client";

import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type interviewItemType =
  inferRouterOutputs<AppRouter>["interviews"]["getInterviewTableData"]["interviewTableData"][0];

type InterviewContextType = {
  interview?: interviewItemType;
  setCurrentInterview: (interview: interviewItemType | undefined) => void;
};

const interviewContextDefaultValues: InterviewContextType = {
  interview: {
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
  setCurrentInterview: () => {},
};

const InterviewContext = createContext<InterviewContextType>(
  interviewContextDefaultValues,
);

export const InterviewProvider = ({ children }: PropsWithChildren) => {
  const [interview, setInterview] = useState<interviewItemType>();
  const setCurrentInterview = (interview: interviewItemType | undefined) => {
    setInterview(interview);
  };
  const value = {
    interview,
    setCurrentInterview,
  };
  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterviewContext = () => useContext(InterviewContext);
