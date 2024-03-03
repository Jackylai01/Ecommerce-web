import {
  NullableObjectIdSchema,
  ObjectSchema,
  RequiredEmailSchema,
  RequiredStringSchema,
} from '../../../models/schema/base.schema';

export const ModifyClientUserSchema = () =>
  ObjectSchema().keys({
    _id: NullableObjectIdSchema(),
    name: RequiredStringSchema(),
    email: RequiredEmailSchema(),
  });
