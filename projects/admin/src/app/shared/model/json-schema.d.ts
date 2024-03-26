import { JSONSchema7 } from 'json-schema';

export type JSONSchema = Omit<JSONSchema7, 'properties'> & {
  properties: {
    [key: string]: JSONSchema;
  };
  definitions: {
    [key: string]: JSONSchema;
  };
};
