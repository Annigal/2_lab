// ВНИМАНИЕ: УЯЗВИМЫЙ КОД - ТОЛЬКО ДЛЯ ОБУЧЕНИЯ!
// Не используйте этот код в продакшене!

const express = require('express');
const app = express();

// Отключаем кэширование views для разработки
app.set('view cache', false);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// "База данных" комментариев
const comments = [];

// Форма для комментариев (уязвима к XSS)
app.get('/', (req, res) => {
  res.render('index-vulnerable', { comments });
});

// Сохранение комментария (без санитизации) - УЯЗВИМОСТЬ!
app.post('/comment', (req, res) => {
  // Нет валидации длины
  // Нет санитизации ввода
  comments.push(req.body.text);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('УЯЗВИМЫЙ сервер запущен на http://localhost:3000');
  console.log('Не используйте в продакшене!');
});
