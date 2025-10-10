FROM node:20-alpine AS development

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV NODE_ENV=development

EXPOSE 3000
CMD ["npm", "run", "dev"]


FROM node:20-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npm run build

RUN npm install typescript@latest --save


ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]
