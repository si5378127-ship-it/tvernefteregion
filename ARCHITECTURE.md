# Архитектура проекта

## Принципы

1. **Данные отделены от UI** — контент в `src/content/`, конфигурация в `src/config/`
2. **Server Components по умолчанию** — client только для интерактива
3. **Единый слой контактов** — `src/config/contacts.ts`
4. **ContentProvider** — абстракция для замены локальных данных на CMS

## Структура

```
src/
├── app/
│   ├── (site)/          # Публичные страницы
│   ├── api/forms/       # Route Handlers форм
│   ├── layout.tsx       # Root layout
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/          # Header, Footer, MobileBar, BottomSheet
│   ├── sections/        # Секции страниц (не UI!)
│   ├── forms/           # React Hook Form компоненты
│   └── ui/              # Атомарные UI-компоненты
├── config/              # site, contacts, navigation
├── content/             # Локальные данные (→ CMS)
├── lib/                 # utils, motion, seo
├── services/
│   ├── content/         # LocalContentProvider
│   └── forms/           # Обработка заявок
├── types/               # TypeScript интерфейсы
├── validation/          # Zod-схемы
└── styles/              # globals.css, design tokens
```

## ContentProvider

```typescript
interface ContentProvider {
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  // ...
}
```

`LocalContentProvider` читает из `src/content/`. При подключении Payload CMS создаётся `PayloadContentProvider` с тем же интерфейсом.

## Каналы связи

Все контакты — через env-переменные в `src/config/contacts.ts`. Disabled-каналы фильтруются и не отображаются.

## Формы

- Клиентская валидация: React Hook Form + Zod
- Серверная валидация: Route Handlers
- Honeypot + rate limit (5 сек)
- Dev: лог в `logs/form-submissions.log`
- Prod: TODO — SMTP + Payload CMS

## SEO

- Metadata API в layout
- JSON-LD Organization + WebSite
- robots.ts, sitemap.ts
- Семантический HTML, один H1

## Дизайн-система

Токены в `src/styles/globals.css` (@theme):
- Цвета: white, warm-gray, graphite, brand-blue, brand-green
- Типографика: Inter
- Контейнер: max 1280px
- Touch targets: min 44×44px

## Анимации

Framer Motion с `prefers-reduced-motion`. Умеренные fade/reveal.

## Будущее: Payload CMS + PostgreSQL

См. [CMS_PLAN.md](./CMS_PLAN.md).
