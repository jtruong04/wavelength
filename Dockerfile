# STAGE 1
FROM node:latest as client
RUN mkdir /client
WORKDIR /client
ENV NODE_ENV production
COPY ./client/package*.json ./
RUN yarn install
COPY ./client .
RUN yarn build

# STAGE 2

FROM node:latest
RUN mkdir -p /server
WORKDIR /server
COPY --from=client /client/build/ ./build/
ENV NODE_ENV production
COPY ./server/package*.json ./
RUN npm install -qy && npm install typescript@latest -g
COPY ./server .
RUN yarn build

# ENV PORT 5000
# EXPOSE 5000

CMD ["npm", "start"]