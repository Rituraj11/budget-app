FROM node:16.13.2-alpine

ENV RDS_PORT=3306 \
    RDS_HOSTNAME=budgetdb.cu564rflfxv2.ap-south-1.rds.amazonaws.com \
    RDS_DBNAME=budgetdb \ 
    RDS_USERNAME=admin \
    RDS_PASSWORD=7561212ritu11 \
    SALT=10 \
    JWTPRIVATEKEY=secretkey

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
USER node
CMD ["npm", "start"]