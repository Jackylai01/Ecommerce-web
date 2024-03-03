import {
  NullableObjectIdSchema,
  ObjectSchema,
  RequiredEmailSchema,
  RequiredStringSchema,
} from '../../../models/schema/base.schema';

export const ModifyAdminUserSchema = () =>
  ObjectSchema().keys({
    _id: NullableObjectIdSchema(),
    username: RequiredStringSchema(),
    email: RequiredEmailSchema(),
  });
