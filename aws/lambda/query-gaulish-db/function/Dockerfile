FROM amazon/aws-lambda-nodejs:12

COPY build/app.js build/app.js.map package*.json ./

RUN npm install

CMD [ "app.lambdaHandler" ]
