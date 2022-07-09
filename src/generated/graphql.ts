/* eslint-disable */
// @ts-nocheck
/* 🌶️ This is a generated file, do not modify! */
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = Node & {
  __typename?: 'Chat';
  chat_id?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  recipient_uuid?: Maybe<Scalars['Int']>;
  room_id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['Int']>;
};

export type City = Node & {
  __typename?: 'City';
  city_id: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  tile: Tile;
};

export type Log = Node & {
  __typename?: 'Log';
  id: Scalars['ID'];
  log_id: Scalars['Int'];
  text: Scalars['String'];
  timestamp: Scalars['Int'];
  type: Scalars['Int'];
  uuid: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  isShipSailing?: Maybe<Scalars['Boolean']>;
  setLog: Scalars['Int'];
  setShipPath?: Maybe<Scalars['String']>;
};


export type MutationIsShipSailingArgs = {
  ship_id: Scalars['Int'];
};


export type MutationSetLogArgs = {
  text: Scalars['String'];
  timestamp?: InputMaybe<Scalars['Int']>;
  type: Scalars['Int'];
};


export type MutationSetShipPathArgs = {
  shipPath: Scalars['String'];
  ship_id: Scalars['Int'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Npc = Node & {
  __typename?: 'Npc';
  id: Scalars['ID'];
  path: Array<Tile>;
  ship_type: ShipType;
  should_repeat: Scalars['Boolean'];
  start_time: Scalars['Int'];
};

export type Path = Node & {
  __typename?: 'Path';
  id: Scalars['ID'];
  path: Scalars['String'];
  path_id: Scalars['Int'];
  ship_id: Scalars['Int'];
  start_time: Scalars['Int'];
};

export type Point = {
  x?: InputMaybe<Scalars['Int']>;
  y?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getAllCities: Array<City>;
  getAllNpcs: Array<Npc>;
  getAllTiles: Array<Tile>;
  getChatHistory: Array<Chat>;
  getRecentLogs?: Maybe<Array<Maybe<Log>>>;
  getShipTypeFromId: ShipType;
  getShipsByUUID: Array<Ship>;
  getTileByID: Tile;
  getTilesAroundTile: Array<Tile>;
  getTilesWithinRectangle: Array<Tile>;
  getUserByUsername: User;
  verifyToken: Scalars['Boolean'];
};


export type QueryGetChatHistoryArgs = {
  room_id?: InputMaybe<Scalars['Int']>;
  timestamp: Scalars['Int'];
};


export type QueryGetShipTypeFromIdArgs = {
  shipTypeId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetShipsByUuidArgs = {
  uuid?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTileByIdArgs = {
  tileId?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTilesAroundTileArgs = {
  point?: InputMaybe<Point>;
  radius?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTilesWithinRectangleArgs = {
  pointA?: InputMaybe<Point>;
  pointB?: InputMaybe<Point>;
};


export type QueryGetUserByUsernameArgs = {
  username?: InputMaybe<Scalars['String']>;
};

export type Ship = Node & {
  __typename?: 'Ship';
  city: City;
  id: Scalars['ID'];
  is_sunk: Scalars['Boolean'];
  name: Scalars['String'];
  ship_id: Scalars['Int'];
  ship_type: ShipType;
  uuid: Scalars['Int'];
};

export type ShipType = Node & {
  __typename?: 'ShipType';
  attack_rating: Scalars['Int'];
  cargo_capacity: Scalars['Int'];
  id: Scalars['ID'];
  inventory_slots: Scalars['Int'];
  name: Scalars['String'];
  ship_type_id: Scalars['Int'];
  speed: Scalars['Int'];
};

export type Tile = Node & {
  __typename?: 'Tile';
  id: Scalars['ID'];
  tile_id: Scalars['Int'];
  type: TileTypes;
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export enum TileTypes {
  Forest = 'forest',
  Meadows = 'meadows',
  Mountains = 'mountains',
  Ocean = 'ocean'
}

export type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  time_created?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['Int']>;
};

export type GetMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMapQuery = { __typename?: 'Query', getAllTiles: Array<{ __typename?: 'Tile', id: string, tile_id: number, x: number, y: number, type: TileTypes }>, getAllCities: Array<{ __typename?: 'City', id: string, city_id: number, name: string, tile: { __typename?: 'Tile', id: string, tile_id: number, x: number, y: number, type: TileTypes } }>, getAllNpcs: Array<{ __typename?: 'Npc', id: string, start_time: number, ship_type: { __typename?: 'ShipType', id: string, ship_type_id: number, name: string, cargo_capacity: number, inventory_slots: number, speed: number }, path: Array<{ __typename?: 'Tile', id: string, tile_id: number, type: TileTypes, x: number, y: number }> }> };

export type GetShipsByUuidQueryVariables = Exact<{
  uuid?: InputMaybe<Scalars['Int']>;
}>;


export type GetShipsByUuidQuery = { __typename?: 'Query', getShipsByUUID: Array<{ __typename?: 'Ship', id: string, ship_id: number, name: string, uuid: number, ship_type: { __typename?: 'ShipType', id: string, ship_type_id: number, name: string, cargo_capacity: number, inventory_slots: number, speed: number }, city: { __typename?: 'City', id: string, city_id: number, name: string, tile: { __typename?: 'Tile', id: string, tile_id: number, x: number, y: number, type: TileTypes } } }> };

export type SetSailMutationVariables = Exact<{
  ship_id: Scalars['Int'];
  shipPath: Scalars['String'];
}>;


export type SetSailMutation = { __typename?: 'Mutation', setShipPath?: string | null };

export type VerifyTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyTokenQuery = { __typename?: 'Query', verifyToken: boolean };


export const GetMapDocument = `
    query getMap {
  getAllTiles {
    id
    tile_id
    x
    y
    type
  }
  getAllCities {
    id
    city_id
    name
    tile {
      id
      tile_id
      x
      y
      type
    }
  }
  getAllNpcs {
    id
    start_time
    ship_type {
      id
      ship_type_id
      name
      cargo_capacity
      inventory_slots
      speed
    }
    path {
      id
      tile_id
      type
      x
      y
    }
  }
}
    `;
export const useGetMapQuery = <
      TData = GetMapQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMapQueryVariables,
      options?: UseQueryOptions<GetMapQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMapQuery, TError, TData>(
      variables === undefined ? ['getMap'] : ['getMap', variables],
      fetcher<GetMapQuery, GetMapQueryVariables>(client, GetMapDocument, variables, headers),
      options
    );
export const GetShipsByUuidDocument = `
    query getShipsByUUID($uuid: Int) {
  getShipsByUUID(uuid: $uuid) {
    id
    ship_id
    name
    uuid
    ship_type {
      id
      ship_type_id
      name
      cargo_capacity
      inventory_slots
      speed
    }
    city {
      id
      city_id
      name
      tile {
        id
        tile_id
        x
        y
        type
      }
    }
  }
}
    `;
export const useGetShipsByUuidQuery = <
      TData = GetShipsByUuidQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetShipsByUuidQueryVariables,
      options?: UseQueryOptions<GetShipsByUuidQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetShipsByUuidQuery, TError, TData>(
      variables === undefined ? ['getShipsByUUID'] : ['getShipsByUUID', variables],
      fetcher<GetShipsByUuidQuery, GetShipsByUuidQueryVariables>(client, GetShipsByUuidDocument, variables, headers),
      options
    );
export const SetSailDocument = `
    mutation setSail($ship_id: Int!, $shipPath: String!) {
  setShipPath(ship_id: $ship_id, shipPath: $shipPath)
}
    `;
export const useSetSailMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetSailMutation, TError, SetSailMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetSailMutation, TError, SetSailMutationVariables, TContext>(
      ['setSail'],
      (variables?: SetSailMutationVariables) => fetcher<SetSailMutation, SetSailMutationVariables>(client, SetSailDocument, variables, headers)(),
      options
    );
export const VerifyTokenDocument = `
    query verifyToken {
  verifyToken
}
    `;
export const useVerifyTokenQuery = <
      TData = VerifyTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: VerifyTokenQueryVariables,
      options?: UseQueryOptions<VerifyTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<VerifyTokenQuery, TError, TData>(
      variables === undefined ? ['verifyToken'] : ['verifyToken', variables],
      fetcher<VerifyTokenQuery, VerifyTokenQueryVariables>(client, VerifyTokenDocument, variables, headers),
      options
    );