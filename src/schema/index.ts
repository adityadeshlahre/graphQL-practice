import { mergeTypeDefs } from "@graphql-tools/merge";

import { usersGQLSchema } from "./user";
import { productsGQLSchema } from "./product";

export const mergedGQLSchema = mergeTypeDefs([
  usersGQLSchema,
  productsGQLSchema,
]);
