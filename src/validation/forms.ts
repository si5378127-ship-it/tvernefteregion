import { z } from 'zod';

const phoneRegex = /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

const phoneField = z
  .string()
  .min(10, 'Введите номер телефона')
  .regex(phoneRegex, 'Некорректный формат телефона');

const nameField = z
  .string()
  .min(2, 'Введите имя (минимум 2 символа)')
  .max(100, 'Слишком длинное имя');

/** Обязательное согласие на обработку персональных данных */
export const personalDataConsentField = z.boolean().refine((value) => value === true, {
  message: 'Необходимо подтвердить согласие на обработку персональных данных.',
});

/** Упрощённая форма расчёта: 5 полей */
export const calculateFormSchema = z.object({
  product: z.string().min(1, 'Выберите вид топлива'),
  volume: z
    .string()
    .min(1, 'Укажите объём')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Укажите корректный объём'),
  locality: z.string().min(2, 'Укажите населённый пункт').max(200),
  name: nameField,
  phone: phoneField,
  personalDataConsent: personalDataConsentField,
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

/** Форма сообщения: имя, телефон, сообщение */
export const contactFormSchema = z.object({
  name: nameField,
  phone: phoneField,
  comment: z.string().min(1, 'Введите сообщение').max(2000, 'Сообщение слишком длинное'),
  personalDataConsent: personalDataConsentField,
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

/** Заказ звонка: имя и телефон */
export const callbackFormSchema = z.object({
  name: nameField,
  phone: phoneField,
  personalDataConsent: personalDataConsentField,
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export type CalculateFormData = z.infer<typeof calculateFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CallbackFormData = z.infer<typeof callbackFormSchema>;
