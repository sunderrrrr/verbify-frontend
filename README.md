# **Развертывание фронтенда на Next.js** 🚀

## **Стек технологий** 🛠️
- **Фреймворк**: Next.js (React) ⚛️
- **UI-библиотека**: Material-UI v3 (MUI3) 🎨
- **API**: REST (бизнес-логика на бэкенде) 🔌
- **Менеджер состояний**: Context API / Redux (опционально) 🧠

---

## **Предварительные требования** 📋
- Node.js v16+ [Скачать](https://nodejs.org/)
- npm или yarn
- Запущенный бэкенд-сервер (см. бэкенд README) ⚙️

---

## **Инструкция по установке** 🛠️

### 1. **Клонирование репозитория**
```bash
git clone github.com/sunderrrrr/verbify-frontend
cd verbify-frontend
```

### 2. **Установка зависимостей**
```bash
npm install
# или
yarn install
```

### 3. **Настройка окружения**
Создайте файл `.env.local` в корне проекта:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api  # URL вашего бэкенда
```

### 4. **Запуск в режиме разработки**
```bash
npm run dev
# или
yarn dev
```
Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000) 🌐

---

## **Сборка для продакшена** 🏗️

### 1. **Сборка проекта**
```bash
npm run build
# или
yarn build
```

### 2. **Запуск продакшен-версии**
```bash
npm start
# или
yarn start
```

---

## **Дополнительные команды** 🔧

| Команда | Описание |
|---------|----------|
| `npm run lint` | Проверка кода ESLint |
| `npm run test` | Запуск тестов |
| `npm run storybook` | Запуск Storybook (если есть) |

---

## **Настройка API** ⚙️
Все запросы к API должны отправляться на адрес, указанный в `NEXT_PUBLIC_API_URL`. Пример:
```javascript
fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  .then(response => response.json())
```

---

## **Возможные проблемы** ❗
- **Ошибки API**: Проверьте, запущен ли бэкенд и правильный ли URL в `.env.local`
- **Стили MUI**: Убедитесь, что тема правильно подключена в `_app.js`
- **Хот-релоад**: Если не работает, попробуйте удалить `.next` папку и перезапустить dev-сервер

---

**Happy coding!** 😊🚀