export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  mountains: Array<MountainWithTrailCount>;
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
  nearTo?: Maybe<DistanceFromGeoPointInput>;
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
  name: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  slug: Scalars['String'];
  mountain: Scalars['String'];
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
};

export type GeoPoint = {
  __typename?: 'GeoPoint';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
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

export type MountainWithTrailCount = {
  __typename?: 'MountainWithTrailCount';
  name?: Maybe<Scalars['String']>;
  trails: Scalars['Int'];
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
  userId: Scalars['Int'];
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
  id?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['String']>;
  isNearby?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
  createUser: User;
};


export type MutationUpdateUserArgs = {
  userId?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  userId?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};
