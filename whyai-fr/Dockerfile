FROM node:18-alpine

WORKDIR /app

# Копируем ВСЕ файлы фронтенда
COPY . .

# Устанавливаем зависимости и собираем проект
RUN npm ci
RUN npm run build

# Настраиваем окружение
ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]