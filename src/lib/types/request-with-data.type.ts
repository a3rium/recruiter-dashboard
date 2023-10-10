import { Request } from "@prisma/client";

export type RequestData = Request & {
  customer: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  requester: {
    id: number;
    firstName: string;
    lastName: string;
  };
};
