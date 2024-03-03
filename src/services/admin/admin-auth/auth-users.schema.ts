import * as Joi from 'joi';
import {
  NullableStringSchema,
  ObjectSchema,
  RequiredEmailSchema,
  RequiredObjectIdSchema,
  RequiredStringSchema,
} from '../../../models/schema/base.schema';

export const SendForgotCodeSchema = () =>
  ObjectSchema().keys({
    email: RequiredEmailSchema(),
  });

export const ResetPasswordSchema = () =>
  ObjectSchema().keys({
    userId: RequiredObjectIdSchema(),
    code: RequiredStringSchema(),
    password: RequiredStringSchema().pattern(PasswordRegex),
    confirmPassword: RequiredStringSchema()
      .valid(Joi.ref('password'))
      .required()
      .error((error) => {
        const item = error.find((x) => x.code === 'any.only');
        if (item) {
          item.message = '確認密碼不相符';
        }
        return <any>error;
      }),
  });

export const LoginSchema = () =>
  ObjectSchema().keys({
    email: RequiredStringSchema(),
    password: RequiredStringSchema(),
  });

export const UsernameRegex = /^[a-zA-Z0-9]{6,30}$/;

export const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;

export const PhoneNumberRegex = /^09\d{8}$/;

export const EmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;

export const PhoneCarrierRegex = /^\/[\dA-Z\.+-]{7}$/;

export const CitizenDigitalCertificateRegex = /^[a-zA-z]{2}\d{14}$/;

export const RegisterSchema = () =>
  ObjectSchema().keys({
    username: RequiredStringSchema().pattern(UsernameRegex),
    password: RequiredStringSchema().pattern(PasswordRegex),
    confirmPassword: RequiredStringSchema()
      .valid(Joi.ref('password'))
      .required()
      .error((error) => {
        const item = error.find((x) => x.code === 'any.only');
        if (item) {
          item.message = '確認密碼不相符';
        }
        return <any>error;
      }),
    name: RequiredStringSchema(),
    email: RequiredEmailSchema(),
    phoneNumber: RequiredStringSchema().pattern(PhoneNumberRegex),
    invitationCode: NullableStringSchema(),
  });

export const CreateAccountSchema = () =>
  ObjectSchema().keys({
    name: RequiredStringSchema().pattern(UsernameRegex),
    password: RequiredStringSchema().pattern(PasswordRegex),
    email: RequiredEmailSchema(),
    phoneNumber: RequiredStringSchema().pattern(PhoneNumberRegex),
  });

export const ThirdPartyRegisterSchema = () =>
  ObjectSchema().keys({
    userId: RequiredObjectIdSchema(),
    username: RequiredStringSchema().pattern(UsernameRegex),
    name: RequiredStringSchema(),
    email: RequiredEmailSchema(),
    phoneNumber: RequiredStringSchema().pattern(PhoneNumberRegex),
    invitationCode: NullableStringSchema(),
  });

export const UpdateAdminProfileSchema = () =>
  ObjectSchema().keys({
    name: RequiredStringSchema(),
    email: RequiredEmailSchema(),
    phoneNumber: NullableStringSchema().pattern(PhoneNumberRegex),
  });
