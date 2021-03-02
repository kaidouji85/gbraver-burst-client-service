FROM node:14.16.0-slim
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm ci
RUN npm run build
CMD [ "npm", "run", "serve" ]
EXPOSE 3000