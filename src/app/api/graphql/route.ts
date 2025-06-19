import { createYoga, createSchema } from 'graphql-yoga';
import type { NextRequest } from 'next/server';

export const { handleRequest } = createYoga<{
  req: NextRequest;
}>({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        health: String!
      }
    `,
    resolvers: { Query: { health: () => 'OK' } },
  }),
  maskedErrors: process.env.NODE_ENV === 'production',
});

export { handleRequest as GET, handleRequest as POST };
