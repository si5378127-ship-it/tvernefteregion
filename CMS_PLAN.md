# План интеграции Payload CMS + PostgreSQL

## Этап 1: Инфраструктура

1. Установить Payload CMS 3.x в monorepo или отдельный `cms/` каталог
2. Настроить PostgreSQL (`DATABASE_URI`)
3. Создать `PAYLOAD_SECRET`
4. Настроить `next.config.ts` для интеграции с Payload

## Этап 2: Collections (модели)

| Collection | Поля | Заменяет |
|-----------|------|----------|
| Products | id, slug, title, shortDescription, application, priceMode, priceFrom, priceUnit, availability, updatedAt, image, active | `src/content/products.ts` |
| Industries | id, title, description, icon | `src/content/industries.ts` |
| Regions | id, name, slug, description | `src/content/regions.ts` |
| DeliverySteps | step, title, description | `src/content/delivery.ts` |
| SupplyCases | title, region, product, description, date | `src/content/cases.ts` |
| FAQ | question, answer | `src/content/faq.ts` |
| Testimonials | author, company, role, text, active | `src/content/cases.ts` |
| News | title, excerpt, date, slug, active | `src/content/cases.ts` |
| FormSubmissions | formType, data, status, createdAt | `logs/` + SMTP |
| SiteSettings | legalName, requisites, seo | `src/config/site.ts` |

## Этап 3: PayloadContentProvider

```typescript
// src/services/content/payload-provider.ts
export class PayloadContentProvider implements ContentProvider {
  async getProducts() {
    const result = await payload.find({ collection: 'products', where: { active: { equals: true } } });
    return result.docs.map(mapProduct);
  }
  // ...
}
```

Переключение в `src/services/index.ts`:

```typescript
export const contentProvider =
  process.env.PAYLOAD_ENABLED === 'true'
    ? new PayloadContentProvider()
    : new LocalContentProvider();
```

## Этап 4: Формы

1. FormSubmissions collection в Payload
2. Route Handlers сохраняют заявки в CMS
3. SMTP-уведомления при новой заявке
4. Админ-панель Payload для просмотра заявок

## Этап 5: Медиа

1. Payload Media collection
2. Замена ImagePlaceholder на реальные изображения из CMS
3. next/image с remotePatterns для Payload media URL

## Этап 6: Контакты

Опционально: SiteSettings global в Payload для контактов вместо env.
На первом этапе env-переменные остаются — CMS для контента, env для секретов.

## Миграция без переписывания UI

UI-компоненты работают с типами из `src/types/`. Мапперы в PayloadContentProvider приводят CMS-документы к этим типам. Секции и карточки не меняются.

## Порядок работ

1. PostgreSQL + Payload init
2. Collections: Products, FAQ
3. PayloadContentProvider для Products
4. Остальные collections
5. FormSubmissions + email
6. Media + замена placeholders
7. SiteSettings + SEO из CMS
