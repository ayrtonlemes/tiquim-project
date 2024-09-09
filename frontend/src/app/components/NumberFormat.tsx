import * as React from "react";
import { NumericFormatProps } from "react-number-format";
import Stack from "@mui/material/Stack";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { FormattedInputsProps } from "../types/FormattedInputsProps";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        fixedDecimalScale
        displayType="input"
        allowNegative={false}
      />
    );
  },
);

export default function FormattedInputs({
  campaignInfo,
  setCampaignInfo,
  register,
  errors,
}: FormattedInputsProps) {
  return (
    <Stack>
      <TextField
        label=""
        fullWidth
        type="text"
        value={campaignInfo.goal?.toFixed(2).replace(".", ",") || ""}
        id="goal"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="outlined"
        margin="normal"
        sx={{ backgroundColor: "white" }}
        {...register("goal", {
          required: "Esse campo é obrigatório",
          validate: (value) => {
            // Confirma se o valor é uma string e substitui a vírgula por ponto
            const numericValue = parseFloat(value.toString().replace(",", "."));
            return numericValue >= 1 || "Deve ser no mínimo 1";
          },
        })}
        onChange={(e) => {
          // Converte o valor para número ao definir o estado
          setCampaignInfo({ ...campaignInfo, goal: parseFloat(e.target.value.replace(",", ".")) });
        }}
      />
      {errors.goal && <Box sx={{ color: "error.main" }}>{errors.goal.message}</Box>}
    </Stack>
  );
}
