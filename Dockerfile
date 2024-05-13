FROM node:20.13.0-alpine3.19 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

FROM base
COPY --from=build /app/build /app/build
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/@fastify/swagger-ui/static /app/static
EXPOSE 3000
CMD [ "pnpm", "start:migrate:prod" ]