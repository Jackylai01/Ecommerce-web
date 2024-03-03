import {
  NullableBooleanSchema,
  NullableStringSchema,
  ObjectSchema,
  RequiredUrlSchema,
} from './base.schema';

export const PhotoSchema = () =>
  ObjectSchema().keys({
    imageUrl: RequiredUrlSchema(),
    description: NullableStringSchema(),
    isCover: NullableBooleanSchema().default(false),
  });
