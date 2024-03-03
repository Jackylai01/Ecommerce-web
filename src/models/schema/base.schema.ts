import * as joi from 'joi';

export const Joi = joi;

export const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const objectIdExtendedJoi = joi.extend((joi) => {
  return {
    type: 'objectId',
    base: joi.any(),
    messages: {
      objectId: '{{#label}} is not a valid ObjectId',
    },
    validate(value, helpers) {
      if (!OBJECT_ID_REGEX.test(value)) {
        return { value, errors: helpers.error('objectId') };
      }
      return { value };
    },
  };
});

export const RequiredStringSchema = () => joi.string().required();

export const NullableStringSchema = () =>
  joi.string().allow(null).empty('').default(null);

export const RequiredUrlSchema = () =>
  joi.string().required().pattern(UrlRegex).messages({
    'string.pattern.base': 'not a url format',
  });

export const NullableUrlSchema = () =>
  joi.alternatives().try(RequiredUrlSchema(), NullableStringSchema());

export const RequiredEmailSchema = () =>
  joi.string().required().pattern(EmailRegex).messages({
    'string.pattern.base': 'not an email format',
  });

export const NullableEmailSchema = () =>
  joi
    .string()
    .allow(null)
    .empty('')
    .default(null)
    .pattern(EmailRegex)
    .messages({
      'string.pattern.base': 'not an email format',
    });

export const RequiredNumberSchema = () => joi.number().required();

export const NullableNumberSchema = () =>
  joi.number().allow(null).empty('').default(null);

export const RequiredIntegerSchema = () => joi.number().integer().required();

export const NullableIntegerSchema = () =>
  joi.number().integer().allow(null).empty('').default(null);

export const RequiredDateSchema = () => joi.date().required();

export const NullableDateSchema = () =>
  joi.date().allow(null).empty('').default(null);

export const RequiredBooleanSchema = () => joi.boolean().required();

export const NullableBooleanSchema = () =>
  joi.boolean().allow(null).default(null);

export const DefaultTrueBooleanSchema = () => joi.boolean().default(true);

export const DefaultFalseBooleanSchema = () => joi.boolean().default(false);

export const ObjectSchema = () => joi.object();

export const NullableObjectSchema = () =>
  ObjectSchema().allow(null).default(null);

export const RequiredArraySchema = () => joi.array().min(1).required();

export const NullableArraySchema = () => joi.array().allow(null).default([]);

export const RequiredObjectIdSchema = () =>
  objectIdExtendedJoi.objectId().required();

export const NullableObjectIdSchema = () =>
  joi
    .alternatives()
    .try(objectIdExtendedJoi.objectId(), NullableStringSchema());

export const IdsSchema = () =>
  ObjectSchema().keys({
    ids: joi.array().items(RequiredObjectIdSchema()),
  });

export const IdSchema = () =>
  ObjectSchema().keys({
    id: RequiredObjectIdSchema().allow('null').required(),
  });

export const PagingSchema = (fields?: { [name: string]: any }) =>
  ObjectSchema().keys({
    ...fields,
    keyword: NullableStringSchema(),
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).default(10),
    sort: joi.string().regex(/[+-]?[0-9a-zA-Z]*[,]?/),
  });

export const RangeDatesSchema = () =>
  ObjectSchema().keys({
    startDate: NullableDateSchema(),
    endDate: NullableDateSchema(),
  });

export const RequiredRangeDatesSchema = () =>
  ObjectSchema().keys({
    startDate: RequiredDateSchema(),
    endDate: RequiredDateSchema(),
  });

export const RequiredEnumSchema = (enumType: any, ...exceptions: string[]) => {
  const list = [...exceptions];
  for (const key of Object.keys(enumType)) {
    if (!/^\d+$/g.test(key)) {
      list.push(enumType[key]);
    }
  }
  return RequiredStringSchema().valid(...list);
};

export const NullableEnumSchema = (enumType: any, ...exceptions: string[]) => {
  const list = [...exceptions];
  for (const key of Object.keys(enumType)) {
    if (!/^\d+$/g.test(key)) {
      list.push(enumType[key]);
    }
  }
  return NullableStringSchema().valid(...list);
};

export const UsernameRegex = /^[a-zA-Z0-9]{6,30}$/;

// Password Special Characters:
// !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
// https://owasp.org/www-community/password-special-characters
export const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;

export const PhoneNumberRegex = /^09\d{8}$/;

// https://mathiasbynens.be/demo/url-regex
// https://gist.github.com/dperini/729294
export const UrlRegex =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

// https://www.w3resource.com/javascript/form/email-validation.php
export const EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

export const validateSchema = (schema: joi.ObjectSchema, orgValue: any) => {
  const options: joi.ValidationOptions = {
    abortEarly: false,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(orgValue, options);
  return { error, value };
};
