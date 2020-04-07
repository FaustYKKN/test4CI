# Product Portal CI

# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /product-protal

# Copy the current directory contents into the container at /app
ADD . /product-protal

# Run product-portal build
RUN NODE_ENV=development npm install \
  # && npm run build \
  && rm -rf `ls -a .|egrep -v '(^\.\.?$|bin|models|build|public|config|branch-config|server|.npmrc|epm-ui-boot.config.js|LICENSE|package.json|package-lock.json)'` \
  ; NODE_ENV=production npm install \
  && npm cache clean --force

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define NODE_ENV environment variable
ENV NODE_ENV production

CMD npm start
