CREATE TABLE public.users (
    "UserId" integer NOT NULL PRIMARY KEY,
    "Name" character varying(1000) NOT NULL,
    "Email" character varying(1000) NOT NULL,
    "Description" text,
    "RegisteredOn" timestamp without time zone NOT NULL
);
