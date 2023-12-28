# Use the official Node.js image with Alpine Linux as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY . .
ENV PORT=80
EXPOSE 80
# Command to run your application
CMD ["npm", "start"]
