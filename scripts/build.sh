#!/bin/bash

pnpm;
pnpm clean:build;

pnpm build:common;
pnpm build:apps;

SERVER_PUBLIC="./apps/server/dist/public";
CLIENT_BUILD="../../client/dist";

[ -e "$SERVER_PUBLIC" ] && rm "$SERVER_PUBLIC"

ln -s "$CLIENT_BUILD" "$SERVER_PUBLIC";