import type { Query, Mutation } from "@/generated/graphql"

export enum LOCAL_STORAGE_KEYS {
  TOKEN = "TOKEN",
  HAS_WEBSOCKET_ENABLED = "HAS_WEBSOCKET_ENABLED",
  CELL_SIZE = "CELL_SIZE",
}

export type GRAPHQL_QUERY_KEYS = keyof Omit<Query & Mutation, "__typename">

export const MAX_CHARACTERS_IN_CHAT = 50

export const DEFAULT_CELL_SIZE = 70

export const MAX_CELL_SIZE = 100

export const MIN_CELL_SIZE = 50

export const CELL_SIZE_INCREMENT = 10
