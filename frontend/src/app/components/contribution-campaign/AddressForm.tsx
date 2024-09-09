import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { Box, FormControlLabel, FormHelperText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAddress, useUserAddress } from "@/app/hooks/useAddress";
import { useCountries } from "@/app/hooks/useCountries";
import { useContext, useEffect } from "react";
import PaymentContext from "../../states/PaymentProvider";
import getAddress from "../../services/address";
import useAuthContext from "@/app/hooks/useAuthContext";


// Deixa os inputs alinhados
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

// Tira os botões de incremento e decremento do input number
const StyledOutlinedInput = styled(OutlinedInput)(() => ({
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
  {
    "-webkit-appearance": "none",
  },
}));

interface AddressFormProps {
  errors: {
    zip: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{
    zip: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  }>>;
}

export default function AddressForm({ errors, setErrors }: AddressFormProps) {
  const { id } = useAuthContext();
  const { addressInfo, setAddressInfo, saveAddress, setSaveAddress } = useContext(PaymentContext);
  const [zip, setZip] = React.useState("");
  const { address, isLoading: isAddressLoading, isError: isAddressError } = useAddress(zip);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const { countries, isLoading: isCountriesLoading, isError: isCountriesError } = useCountries();
  const [selectedAddress, setSelectedAddress] = React.useState<string | "">("");
  const {
    userAddress,
    isPending: isPendingUserAddress,
    isError: isUserAddressError,
  } = useUserAddress(id);

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value;
    setAddressInfo((prev) => ({ ...prev, zip: cep }));
    setErrors((prevErrors) => ({ ...prevErrors, zip: "" }));

    // Verifica se o CEP tem 8 dígitos e é brasileiro
    if (cep.length === 8 && /^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
      setAddressInfo((prev) => ({ ...prev, country: "Brasil" }));
      setErrors((prevErrors) => ({ ...prevErrors, country: "" }));

      // Busca o endereço pelo CEP
      const addressData = await getAddress(cep);
      if (addressData) {
        setAddressInfo((prev) => ({
          ...prev,
          street: addressData.logradouro,
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          state: addressData.uf,
        }));
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setAddressInfo((prev) => ({ ...prev, country: event.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
  };

  const handleAddressSelectionChange = async (event: { target: { value: unknown } }) => {
    const addressId = event.target.value as string;
    if (userAddress) {
      const addressItem = userAddress.find((address) => address.id === addressId);

      const calculatedAddress = await getAddress(addressItem?.cep ?? "");

      if (addressItem) {
        setAddressInfo({
          zip: addressItem.cep || "",
          street: calculatedAddress.logradouro || "",
          number: addressItem.number || "",
          neighborhood: calculatedAddress.bairro || "",
          city: addressItem.city || "",
          state: calculatedAddress.uf || "",
          country: calculatedAddress.country || "Brasil",
        });
        setSelectedAddress(addressId);
        setErrors((prev) => ({ ...prev, zip: "", street: "", number: "", neighborhood: "", city: "", state: "", country: "" }));
      } else {
        console.warn(`Endereço de ID ${addressId} não encontrado.`);
      }
    } else {
      console.warn("Nenhum endereço encontrado");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "auto" }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        {userAddress && userAddress?.length > 0 && (
          <FormGrid item xs={12}>
            <FormLabel htmlFor="savedAddresses" required>
              Endereços Salvos
            </FormLabel>
            <Select
              id="savedAddresses"
              name="savedAddresses"
              value={selectedAddress || ""}
              onChange={handleAddressSelectionChange}
              required
              displayEmpty
            >
              {userAddress?.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {`CEP:${address.cep}, ${address.number}, ${address.city}, ${address.uf}`}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
        )}
        <FormGrid item xs={12} md={3}>
          <FormLabel htmlFor="zip" required>
            CEP
          </FormLabel>
          <StyledOutlinedInput
            id="zip"
            name="zip"
            type="number"
            autoComplete="shipping postal-code"
            required
            value={addressInfo.zip}
            onChange={handleCepChange}
            error={!!errors.zip}
          />
          {errors.zip && <FormHelperText error>{errors.zip}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={12} md={9}>
          <FormLabel htmlFor="street" required>
            Rua
          </FormLabel>
          <OutlinedInput
            id="street"
            name="street"
            type="text"
            autoComplete="street"
            required
            value={addressInfo.street}
            onChange={handleInputChange}
            disabled={isAddressLoading || isAddressError}
            error={!!errors.street}
          />
          {errors.street && <FormHelperText error>{errors.street}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={12} md={3}>
          <FormLabel htmlFor="number" required>
            Número
          </FormLabel>
          <StyledOutlinedInput
            id="number"
            name="number"
            type="number"
            autoComplete="street number"
            required
            value={addressInfo.number}
            onChange={handleInputChange}
            error={!!errors.number}
          />
          {errors.number && <FormHelperText error>{errors.number}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={12} md={9}>
          <FormLabel htmlFor="neighborhood" required>
            Bairro
          </FormLabel>
          <OutlinedInput
            id="neighborhood"
            name="neighborhood"
            type="text"
            autoComplete="neighborhood"
            required
            value={addressInfo.neighborhood}
            onChange={handleInputChange}
            disabled={isAddressLoading || isAddressError}
            error={!!errors.neighborhood}
          />
          {errors.neighborhood && <FormHelperText error>{errors.neighborhood}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            Cidade
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="text"
            autoComplete="city"
            required
            value={addressInfo.city}
            onChange={handleInputChange}
            disabled={isAddressLoading || isAddressError}
            error={!!errors.city}
          />
          {errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            Estado
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            type="text"
            autoComplete="state"
            required
            value={addressInfo.state}
            onChange={handleInputChange}
            disabled={isAddressLoading || isAddressError}
            error={!!errors.state}
          />
          {errors.state && <FormHelperText error>{errors.state}</FormHelperText>}
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            País
          </FormLabel>
          <Select
            id="country"
            name="country"
            value={addressInfo.country}
            onChange={handleCountryChange}
            required
            disabled={isCountriesLoading || isCountriesError}
            error={!!errors.country}
          >
            {countries?.map((country: string) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
          {errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
        </FormGrid>
      </Grid>
    </Box>
  );
}