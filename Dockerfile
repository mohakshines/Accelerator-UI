FROM node:16.15.0-alpine3.14

WORKDIR /app
COPY package.json ./
RUN npm install
# ENV PATH="./node_modules/.bin:$PATH"
COPY . .

EXPOSE 3000
# RUN npm run build
CMD ["npm",  "start"]