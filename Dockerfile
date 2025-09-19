FROM oven/bun:1 AS base

WORKDIR /usr/src/node-proc

# install dependencies into temp
# this will cache them and speed up future builds
FROM base AS deps
# dev dependencies (used for build & test)
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
# pre release requires dev dependencies to runtest
FROM base AS prerelease
COPY --from=deps /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production

# optional: run tests (remove if you don’t need in CI/CD)
# ENV NODE_ENV=production
# RUN bun test
RUN bun run build

# 4. Final production image
# production doesnt require dev dependencies
FROM base AS release
ENV NODE_ENV=production
COPY --from=deps /temp/prod/node_modules ./node_modules
# copy build output
COPY --from=prerelease /usr/src/node-proc/dist ./dist
COPY package.json bun.lock ./


USER bun
EXPOSE 5000
CMD ["bun", "start"]