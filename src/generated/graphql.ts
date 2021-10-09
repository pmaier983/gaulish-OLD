export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Chat = Node & {
  __typename?: "Chat"
  id: Scalars["ID"]
  text: Scalars["String"]
  time: Scalars["String"]
  username?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  chatGlobally?: Maybe<Scalars["Boolean"]>
}

export type MutationChatGloballyArgs = {
  text: Scalars["String"]
  username: Scalars["String"]
}

export type Node = {
  id: Scalars["ID"]
}

export type Point = {
  x?: Maybe<Scalars["Int"]>
  y?: Maybe<Scalars["Int"]>
}

export type Query = {
  __typename?: "Query"
  getAllTiles: Array<Tile>
  getTileByID: Tile
  getTilesAroundTile: Array<Tile>
  getTilesWithinRectangle: Array<Tile>
  getUserByUsername: User
  verifyToken: Scalars["Boolean"]
}

export type QueryGetTileByIdArgs = {
  tileId?: Maybe<Scalars["Int"]>
}

export type QueryGetTilesAroundTileArgs = {
  point?: Maybe<Point>
  radius?: Maybe<Scalars["Int"]>
}

export type QueryGetTilesWithinRectangleArgs = {
  pointA?: Maybe<Point>
  pointB?: Maybe<Point>
}

export type QueryGetUserByUsernameArgs = {
  username?: Maybe<Scalars["String"]>
}

export type Subscription = {
  __typename?: "Subscription"
  globalChat: Chat
}

export type Tile = Node & {
  __typename?: "Tile"
  id: Scalars["ID"]
  tile_id: Scalars["Int"]
  type: TileTypes
  x: Scalars["Int"]
  y: Scalars["Int"]
}

export enum TileTypes {
  Forest = "forest",
  Meadows = "meadows",
  Mountains = "mountains",
  Ocean = "ocean",
}

export type User = Node & {
  __typename?: "User"
  email?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  time_created?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
  uuid?: Maybe<Scalars["Int"]>
}
