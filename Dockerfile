# Step 1: Use official Node.js image for Node v21.x
FROM node:21-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package.json /app
COPY package-lock.json /app

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of the application files
COPY . /app

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

CMD npm run start -- -p 3000
