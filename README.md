# Портфолио — Айсулу Айтбаева

## Как опубликовать

1. Создать репозиторий на GitHub (Public).
2. Загрузить все файлы этой папки через "uploading an existing file" → Commit changes.
3. Зайти на vercel.com → Sign up → Continue with GitHub.
4. Add New Project → выбрать репозиторий → Deploy.

Vercel сам определит, что это Vite-проект — ничего дополнительно настраивать не нужно.

## Как обновить контент позже

- Скриншоты проектов: добавить файлы в /public, заменить плейсхолдер в src/App.jsx (компонент ProjectScreenshotPlaceholder) на <img src="/имя-файла.png" />.
- CV: положить файл в /public с именем cv.pdf — кнопка в шапке уже на него ссылается.
- Тексты и ссылки: всё лежит в начале файла src/App.jsx в понятных блоках (LINKS, projects, experience).

## Локальный запуск (по желанию)

```
npm install
npm run dev
```
