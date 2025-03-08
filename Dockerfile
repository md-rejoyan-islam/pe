FROM node:current-alpine3.21

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 5000

CMD ["npm", "start"] 
