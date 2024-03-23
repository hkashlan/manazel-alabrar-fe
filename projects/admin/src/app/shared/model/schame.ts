import schema from '../../model/json-schema.json';
import { JSONSchema } from './json-schema';

const schemaJson: JSONSchema = schema as unknown as JSONSchema;

export function getJSONSchema(entityName: string): JSONSchema {
  return schemaJson.definitions[entityName];
}
