import { APIService } from '../../../core/services/api.service';
import { RestApiServiceUnkown } from '../../../shared/services/rest-api.service';
import schema from '../../model/json-schema.json';
import { JSONSchema, SchemaInfo } from './json-schema';

const schemaJson: JSONSchema = schema as unknown as JSONSchema;

export function getJSONSchema(entityName: string): JSONSchema {
  return schemaJson.definitions[entityName];
}

function makeFirstLetterLowerCase(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function schemaInfo(entityName: string, apiService: APIService): SchemaInfo {
  const dataSchema: JSONSchema = getJSONSchema(entityName);
  const apiServiceName = makeFirstLetterLowerCase(entityName);
  const restApiService = apiService[apiServiceName as keyof APIService] as RestApiServiceUnkown;
  return { schema: dataSchema, api: restApiService };
}

export function getFirstType(property: JSONSchema): string | undefined {
  if (typeof property.type === 'string') {
    return property.type;
  } else if (Array.isArray(property.type) && property.type.length > 0) {
    return property.type[0];
  }
  return undefined;
}
