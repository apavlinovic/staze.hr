CREATE TABLE public.users (
    "UserId" serial PRIMARY KEY,
    "Name" character varying(1000) NOT NULL,
    "Email" character varying(1000) NOT NULL,
    "Description" text,
    "RegisteredOn" timestamp without time zone NOT NULL,
    "IsAdmin" boolean NOT NULL,
    "AccountStatus" integer NOT NULL
);
