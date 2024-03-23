import schema from '../../model/json-schema.json';
import { JSONSchema } from './json-schema';

export function getJSONSchema(entityName: string): JSONSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (schema.definitions as any as JSONSchema['definitions'])![entityName] as JSONSchema;
}
