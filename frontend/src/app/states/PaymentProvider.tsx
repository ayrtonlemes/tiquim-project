"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
interface ICardInfo {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
}
interface IAddressInfo {
  zip: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
interface IPaymentContext {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  cardInfo: ICardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<ICardInfo>>;
  addressInfo: IAddressInfo;
  setAddressInfo: React.Dispatch<React.SetStateAction<IAddressInfo>>;
  contributionAmount: string;
  setContributionAmount: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  saveAddress: boolean;
  setSaveAddress: React.Dispatch<React.SetStateAction<boolean>>;
  saveCard: boolean;
  setSaveCard: React.Dispatch<React.SetStateAction<boolean>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

interface PaymentProviderProps {
  children: React.ReactNode;
}

const initialState: IPaymentContext = {
  amount: 0,
  contributionAmount: "R$ ",
  paymentMethod: "credit",
  cardInfo: {
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  },
  addressInfo: {
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  },
  setAmount: () => { },
  setCardInfo: () => { },
  setAddressInfo: () => { },
  setContributionAmount: () => { },
  setPaymentMethod: () => { },
  saveAddress: false,
  setSaveAddress: () => { },
  saveCard: false,
  setSaveCard: () => { },
  errors: {},
  setErrors: () => { },
};

const PaymentContext = createContext<IPaymentContext>(initialState);

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [contributionAmount, setContributionAmount] = useState("R$ ");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [saveAddress, setSaveAddress] = useState<boolean>(initialState.saveAddress);
  const [saveCard, setSaveCard] = useState<boolean>(initialState.saveCard);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });
  const [addressInfo, setAddressInfo] = useState({
    zip: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  });

  return (
    <PaymentContext.Provider
      value={{
        amount,
        setAmount,
        cardInfo,
        setCardInfo,
        addressInfo,
        setAddressInfo,
        contributionAmount,
        setContributionAmount,
        paymentMethod,
        setPaymentMethod,
        saveAddress,
        setSaveAddress,
        saveCard,
        setSaveCard,
        errors,
        setErrors,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
