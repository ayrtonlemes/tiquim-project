import { Contribution } from "@prisma/client";

export type CreateContributionDto = Pick<Contribution, "amount" | "campaignId" | "paymentMethodId">;

export type ContributionDto = Contribution;
