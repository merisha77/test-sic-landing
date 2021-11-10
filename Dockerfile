FROM node:16

#RUN npm install -g yarn

RUN npm add pm2 -g

RUN mkdir /sic_landing

WORKDIR /sic_landing

COPY ./package.json /sic_landing

RUN npm install --force

#RUN  npm add next@latest
COPY . /sic_landing

RUN npm run build

CMD ["npm", "start"]
