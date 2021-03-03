FROM node:14.16.0-slim
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install
RUN yarn build
CMD [ "yarn", "serve" ]
EXPOSE 3000