import { Interview } from "@prisma/client";

export type InterviewData = Interview & {
  interviewers: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
  prospect: {
    id: number;
    firstName: string;
    lastName: string;
  };
};
