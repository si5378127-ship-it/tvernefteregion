/**
 * Рабочие контакты компании для отображения на сайте.
 * Переопределяются переменными NEXT_PUBLIC_CONTACT_* из .env.local.
 */
export const contactDefaults = {
  phone: '+79040085012',
  phoneDisplay: '+7 (904) 008-50-12',
  email: 'tver-neft-region@bk.ru',
  telegram: 'https://t.me/Molotoff69',
  /** MAX менеджера по поставкам — основной профиль для быстрой связи */
  max: 'https://max.ru/u/f9LHodD0cOLnmKSi09-fDD16VIPxPLzT9-8aWdqrSXghmtnexGJvLPjB7Qc',
  whatsapp: '79040085012',
  manager: {
    title: 'Менеджер по поставкам',
    phoneDisplay: '8 (904) 025-55-06',
    phoneHref: 'tel:+79040255506',
    maxUrl:
      'https://max.ru/u/f9LHodD0cOLnmKSi09-fDD16VIPxPLzT9-8aWdqrSXghmtnexGJvLPjB7Qc',
  },
} as const;

export type ManagerContact = typeof contactDefaults.manager;
