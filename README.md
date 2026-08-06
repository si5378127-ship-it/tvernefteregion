# ТверьНефтеРегион — корпоративный B2B-сайт

Сайт компании по поставке нефтепродуктов для предприятий.
Стек: **Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Zod**.

> Контрольная точка: коммит / тег стабильной версии перед CMS — см. `git tag`.

## Требования

- Node.js **20+**
- npm **10+**

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000)  
(если порт занят — Next предложит следующий, например `3011`).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run format` | Prettier |

## Структура репозитория

```
├── assets/source/     # исходники дизайна (не отдаются сайтом)
├── content/legal/     # юридические Markdown (privacy, consent)
├── public/            # статика: иконки, паспорта, бренд, изображения
├── src/
│   ├── app/           # App Router: страницы и API форм
│   ├── components/    # UI, секции, формы, legal, layout
│   ├── config/        # контакты, навигация, сайт
│   ├── content/       # локальный контент (продукты, FAQ…)
│   ├── services/      # content/legal providers (под CMS)
│   └── styles/        # globals.css
├── ARCHITECTURE.md
├── CMS_PLAN.md
├── CONTENT_GUIDE.md
└── LICENSE
```

## Важные маршруты

| URL | Назначение |
|-----|------------|
| `/` | Главная |
| `/kontakty` | Контакты |
| `/privacy` | Политика обработки ПДн ← `content/legal/privacy-policy.md` |
| `/consent` | Согласие на обработку ПДн ← `content/legal/consent.md` |

Паспорта качества топлива — только в секции «Качество и документы» (`public/documents/`), не смешивать с юр. документами.

## Переменные окружения

См. `.env.example`. Основные:

- `NEXT_PUBLIC_SITE_URL` — URL сайта
- `NEXT_PUBLIC_CONTACT_*` — телефон, email, мессенджеры
- `SMTP_*` — почта для форм (опционально)
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` — Метрика (после согласия на cookie)

Файл `.env.local` **не коммитится**.

## Документация

- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — контент
- [CMS_PLAN.md](./CMS_PLAN.md) — план Payload CMS

## Восстановление стабильной версии

```bash
git checkout main
git reset --hard v0.1.0-stable
```

(тег создаётся на контрольном коммите стабильного сайта)

## Лицензия

См. [LICENSE](./LICENSE). Код и контент — собственность ООО «ТверьНефтеРегион».
