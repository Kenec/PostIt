# create an image from Node 6.11.2
FROM node:6.11.2

MAINTAINER Nnamani Kenechukwu <nnamani.kenechukwu@gmail.com>

# Create new directory to run our app
RUN mkdir -p /usr/scr/app

# set the new directory as our working directory
WORKDIR /usr/src/app

# copy all the content into the working directory
COPY . /usr/src/app

# install node packages
RUN npm install

# build the app
RUN NODE_ENV=production npm run build

# Our app runs on port 3000. Expose it!
EXPOSE 3000

# Run the appplication
CMD export $(cat .env); NODE_ENV=production npm run start