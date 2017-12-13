# specify the node base image with your desired version node:<version>
FROM node:8.9.3
# Create app directory
WORKDIR /app/express-admin-tool

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./



RUN npm install
#RUN npm link webpack
#RUN webpack
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# replace this with your application's default port
EXPOSE 3000

CMD [ "npm", "start" ]