# Dockerfile (Node API)

# Get a source container for Node.js
FROM node:boron

# Create the app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose bound port
EXPOSE 8080

# Start the App
CMD ["npm", "start"]