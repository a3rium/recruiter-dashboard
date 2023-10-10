import { Employee, Offer, Prospect } from "@prisma/client";

export type OfferData = Offer & {
  offeredTo: {
    id: number;
    firstName: string;
    lastName: string;
  };
  offeredBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
};
