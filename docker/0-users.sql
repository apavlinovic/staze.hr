CREATE TABLE public.users (
    "userId" serial primary key,
    "name" character varying(1000) not null,
    "email" character varying(1000) not null,
    "username" character varying(1000) not null,
    "nonce" character varying(20) not null,
    "passwordHash" text not null,
    "description" text,
    "registeredOn" timestamp with time zone default CURRENT_TIMESTAMP not null,
    "accountRole" integer default 0 not null,
    "accountStatus" integer default 0 not null,

    unique("email")
);
