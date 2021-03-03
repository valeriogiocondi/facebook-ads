FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8081

CMD [ "npm", "run", "start", "--host", "0.0.0.0" ]