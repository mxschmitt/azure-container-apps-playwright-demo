FROM mcr.microsoft.com/playwright:v1.16.3-focal

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY src/ /app/src/
COPY public/ /app/public/

EXPOSE 80

ENTRYPOINT [ "npm", "run", "start" ]