require("dotenv").config();

import { connectDB } from "./db/connect";
// @ts-ignore
import { ApolloServer } from "@apollo/server";
// @ts-ignore
import { startStandaloneServer } from "@apollo/server/standalone";

import { mergedGQLSchema } from "./schema";
import { resolvers } from "./resolvers";

const PORT = parseInt(process.env.PORT as string) || 3000;

const server = new ApolloServer({
  typeDefs: mergedGQLSchema,
  resolvers: resolvers,
  introspection: true,
});

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI as string);
    startStandaloneServer(server, { listen: { port: PORT } });
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
