FROM node:18

WORKDIR /app

COPY . .

RUN npm install

# Без telemetry и watermark
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]
