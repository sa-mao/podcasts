# Common base image
FROM node:13.0.1-stretch as base
WORKDIR /app

# Dev dependencies
FROM base as development 
COPY . .
RUN npm install

# Lint & Build
FROM development as builder
RUN npm run lint
RUN npm run build

# Run utests
FROM builder as tester
RUN npm run test

# Prod Image
FROM node:alpine as prod
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/conf /app/conf
RUN npm install --production

# USER node
CMD ["npm", "run",  "start"]
