import Joi from "joi";

export const languageSchema = Joi.object().keys({
  lang: Joi.valid("pt-BR", "en-US").required().messages({
    "any.only": "Só suporta 'pt-BR', 'en-US'",
  }),
});
