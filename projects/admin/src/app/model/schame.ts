import { JSONSchema7 } from 'json-schema';
import schema from './json-schema.json';

export function getJSONSchema(entityName: string): JSONSchema7 {
  return (schema.definitions as unknown as JSONSchema7)[entityName];
}
