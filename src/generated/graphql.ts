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
  chat_id?: Maybe<Scalars["Int"]>
  id: Scalars["ID"]
  recipient_uuid?: Maybe<Scalars["Int"]>
  room_id?: Maybe<Scalars["Int"]>
  text?: Maybe<Scalars["String"]>
  timestamp?: Maybe<Scalars["Int"]>
  uuid?: Maybe<Scalars["Int"]>
}

export type City = Node & {
  __typename?: "City"
  city_id: Scalars["Int"]
  id: Scalars["ID"]
  name: Scalars["String"]
  tile: Tile
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
  getAllCities: Array<City>
  getAllTiles: Array<Tile>
  getChatHistory: Array<Chat>
  getShipsByUUID: Array<Ship>
  getTileByID: Tile
  getTilesAroundTile: Array<Tile>
  getTilesWithinRectangle: Array<Tile>
  getUserByUsername: User
  verifyToken: Scalars["Boolean"]
}

export type QueryGetChatHistoryArgs = {
  room_id?: Maybe<Scalars["Int"]>
  timestamp: Scalars["Int"]
}

export type QueryGetShipsByUuidArgs = {
  uuid?: Maybe<Scalars["Int"]>
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

export type Ship = Node & {
  __typename?: "Ship"
  city: City
  id: Scalars["ID"]
  name: Scalars["String"]
  ship_id: Scalars["Int"]
  ship_type_id: Scalars["Int"]
  uuid: Scalars["Int"]
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
