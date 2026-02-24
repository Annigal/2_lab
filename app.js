// app.js - XSS Lab Application
// Часть 1: Уязвимое приложение + Часть 3: Защита

const express = require('express');
const helmet = require('helmet');
const { JSDOM } = require('jsdom');
const DOMPurify = require('dompurify')(new JSDOM('').window);

const app = express();
const PORT = 3000;

// Отключаем кэширование views для разработки
app.set('view cache', false);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// === ЗАЩИТА: Content Security Policy с помощью helmet ===
// Блокирует выполнение inline-скриптов и загружает ресурсы только с доверенных источников
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],  // Блокирует inline-скрипты типа <script>alert()</script>
    styleSrc: ["'self'", "'unsafe-inline'"], // Для простоты允许 inline styles
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  }
}));

// Другие защитные заголовки helmet
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: 'deny' }));

// "База данных" комментариев в памяти
const comments = [];

// === МАРШРУТЫ ===

// Главная страница - форма комментариев
app.get('/', (req, res) => {
  res.render('index', { 
    comments,
    title: 'Комментарии (защищено от XSS)'
  });
});

// Обработка отправки комментария
app.post('/comment', (req, res) => {
  let text = req.body.text || '';
  
  // === ВАЛИДАЦИЯ: Ограничение длины комментария (доп. задание) ===
  if (text.length > 200) {
    text = text.substring(0, 200);
  }
  
  // === ЗАЩИТА: Санитизация ввода с помощью DOMPurify ===
  // Удаляет опасные HTML-теги и атрибуты, оставляя только безопасный контент
  const cleanText = DOMPurify.sanitize(text);
  
  // Сохраняем очищенный комментарий
  comments.push({
    text: cleanText,
    timestamp: new Date().toISOString()
  });
  
  res.redirect('/');
});

// API для получения комментариев (опционально)
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  console.log(`Защита активна: helmet + DOMPurify + CSP`);
  console.log(`Комментарии ограничены: 200 символов`);
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err.message);
  res.status(500).send('Внутренняя ошибка сервера');
});
