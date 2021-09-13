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

export type Node = {
  id: Scalars["ID"]
}

export type Point = {
  x?: Maybe<Scalars["Int"]>
  y?: Maybe<Scalars["Int"]>
}

export type Query = {
  __typename?: "Query"
  getAllTiles?: Maybe<Array<Maybe<Tile>>>
  getTilesWithinRectangle?: Maybe<Array<Maybe<Tile>>>
  getTilesAroundTile?: Maybe<Array<Maybe<Tile>>>
  getTileByID?: Maybe<Tile>
  verifyToken: Scalars["Boolean"]
  getUserByUsername?: Maybe<User>
}

export type QueryGetTilesWithinRectangleArgs = {
  pointA?: Maybe<Point>
  pointB?: Maybe<Point>
}

export type QueryGetTilesAroundTileArgs = {
  point?: Maybe<Point>
  radius?: Maybe<Scalars["Int"]>
}

export type QueryGetTileByIdArgs = {
  tileId?: Maybe<Scalars["Int"]>
}

export type QueryGetUserByUsernameArgs = {
  username?: Maybe<Scalars["String"]>
}

export type Tile = Node & {
  __typename?: "Tile"
  id: Scalars["ID"]
  tile_id?: Maybe<Scalars["Int"]>
  x?: Maybe<Scalars["Int"]>
  y?: Maybe<Scalars["Int"]>
}

export type User = Node & {
  __typename?: "User"
  id: Scalars["ID"]
  email?: Maybe<Scalars["String"]>
  time_created?: Maybe<Scalars["Int"]>
  uuid?: Maybe<Scalars["Int"]>
}
