# ТверьНефтеРегион — корпоративный B2B-сайт

Сайт компании по поставке нефтепродуктов для предприятий.

## Требования

- Node.js 20+
- npm 10+

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Копирование переменных окружения
cp .env.example .env.local

# Запуск dev-сервера
npm run dev
```

Сайт будет доступен на [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript проверка |
| `npm run format` | Prettier форматирование |

## Переменные окружения

См. `.env.example`. Основные:

- `NEXT_PUBLIC_SITE_URL` — URL сайта
- `NEXT_PUBLIC_CONTACT_PHONE` — телефон (если пусто — скрыт)
- `NEXT_PUBLIC_CONTACT_EMAIL` — email
- `NEXT_PUBLIC_CONTACT_TELEGRAM` — Telegram
- `NEXT_PUBLIC_CONTACT_WHATSAPP` — WhatsApp
- `NEXT_PUBLIC_CONTACT_MAX` — MAX
- `SMTP_*` — настройки почты для форм
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` — Яндекс Метрика

## Документация

- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура проекта
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — правила контента
- [CMS_PLAN.md](./CMS_PLAN.md) — план интеграции Payload CMS

## Стек

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · React Hook Form · Zod
