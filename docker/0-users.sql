CREATE TABLE public.users (
    "UserId" serial primary key,
    "Name" character varying(1000) not null,
    "Email" character varying(1000) not null,
    "Username" character varying(1000) not null,
    "PasswordHash" text not null,
    "Description" text,
    "RegisteredOn" timestamp with time zone default CURRENT_TIMESTAMP not null,
    "AccountRole" integer default 0 not null,
    "AccountStatus" integer default 0 not null
);
