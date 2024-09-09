import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Campaign, CreateCampaignDto } from "./campaign";

export interface FormattedInputsProps {
  campaignInfo: CreateCampaignDto;
  setCampaignInfo: React.Dispatch<React.SetStateAction<CreateCampaignDto>>;
  register: UseFormRegister<Campaign>;
  handleSubmit: UseFormHandleSubmit<Campaign>;
  errors: FieldErrors<Campaign>;
}
