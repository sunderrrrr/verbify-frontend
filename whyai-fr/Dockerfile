FROM node:18

WORKDIR /app

COPY . .

RUN npm install

# Отключаем telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем проект (build)
RUN npm run build

# Пробрасываем порт 3000
EXPOSE 3000

# Запускаем продакшн-сервер
CMD ["npm", "run", "start"]
