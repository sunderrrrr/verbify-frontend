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
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:8090/api/v1
ENV NEXT_PUBLIC_APP_NAME=Verbify


EXPOSE 3000
CMD ["npm", "run", "start"]
