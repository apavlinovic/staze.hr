export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  trails?: Maybe<PaginatedTrailsResponse>;
  /** Loads Trail information */
  trail?: Maybe<Trail>;
  areas?: Maybe<PaginatedAreasResponse>;
  /** Loads Area information */
  area?: Maybe<Area>;
  users?: Maybe<PaginatedUsersResponse>;
  user?: Maybe<User>;
  login: LoginResponse;
  globalSearch?: Maybe<SearchResponse>;
};


export type QueryTrailsArgs = {
  offset?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  mountain?: Maybe<Scalars['String']>;
  maintainer?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['String']>;
  nearby?: Maybe<DistanceFromGeoPointInput>;
};


export type QueryTrailArgs = {
  trailSlug?: Maybe<Scalars['String']>;
  trailId?: Maybe<Scalars['Float']>;
};


export type QueryAreasArgs = {
  offset?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
};


export type QueryAreaArgs = {
  areaId?: Maybe<Scalars['Float']>;
  areaSlug?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  orderBy?: Maybe<OrderBy>;
  pageSize?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
};


export type QueryUserArgs = {
  email?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Float']>;
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type QueryGlobalSearchArgs = {
  query: Scalars['String'];
};

export type PaginatedTrailsResponse = {
  __typename?: 'PaginatedTrailsResponse';
  items: Array<Trail>;
  total: Scalars['Int'];
  pageSize?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
};

export type Trail = {
  __typename?: 'Trail';
  id: Scalars['Int'];
  type: Scalars['Float'];
  areaId: Scalars['Float'];
  area: Area;
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  maintainer?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['String']>;
  heightDifference?: Maybe<Scalars['String']>;
  relatedInformationLink: Scalars['String'];
  distance: Scalars['Float'];
  hasValidGpx: Scalars['Boolean'];
  gpxTraceId?: Maybe<Scalars['String']>;
  gpxTraceUrl?: Maybe<Scalars['String']>;
  mapName?: Maybe<Scalars['String']>;
  originalMapUrl?: Maybe<Scalars['String']>;
  startLocation?: Maybe<Scalars['String']>;
  startLocationCoords?: Maybe<GeoPoint>;
  endLocation?: Maybe<Scalars['String']>;
  endLocationCoords?: Maybe<GeoPoint>;
  modifiedOn: Scalars['DateTime'];
  gpxTrail?: Maybe<TrailTrace>;
};

export type Area = {
  __typename?: 'Area';
  id: Scalars['Int'];
  type: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
};

export type GeoPoint = {
  __typename?: 'GeoPoint';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};


export type TrailTrace = {
  __typename?: 'TrailTrace';
  trailId: Scalars['Int'];
  trace: Scalars['String'];
};

export type OrderBy = {
  column: Scalars['String'];
  direction?: Maybe<Scalars['String']>;
};

export type DistanceFromGeoPointInput = {
  lat: Scalars['Float'];
  long: Scalars['Float'];
  distanceFromMeters: Scalars['Float'];
};

export type PaginatedAreasResponse = {
  __typename?: 'PaginatedAreasResponse';
  items: Array<Area>;
  total: Scalars['Int'];
  pageSize?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
};

export type PaginatedUsersResponse = {
  __typename?: 'PaginatedUsersResponse';
  items: Array<User>;
  total: Scalars['Int'];
  pageSize?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  nonce: Scalars['String'];
  passwordHash: Scalars['String'];
  description: Scalars['String'];
  registeredOn: Scalars['DateTime'];
  accountRole: Scalars['Float'];
  accountStatus: Scalars['Float'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  results?: Maybe<Array<SearchResult>>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  type: Scalars['Float'];
  text: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['String']>;
  areaId?: Maybe<Scalars['Float']>;
  areaName?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateArea: Area;
  updateUser: User;
  createUser: User;
};


export type MutationUpdateAreaArgs = {
  areaId: Scalars['Int'];
  type?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  userId?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  userId?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};
