import type { Query, Mutation } from "@/generated/graphql"

export enum LOCAL_STORAGE_KEYS {
  TOKEN = "TOKEN",
  HAS_WEBSOCKET_ENABLED = "HAS_WEBSOCKET_ENABLED",
}

export type GRAPHQL_QUERY_KEYS = keyof Omit<Query & Mutation, "__typename">
