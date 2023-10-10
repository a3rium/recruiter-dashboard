import { Prospect } from "@prisma/client";

export type ProspectData = Prospect & {
  recruiter: {
    firstName: string;
    lastName: string;
  };
};
