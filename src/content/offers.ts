export interface OfferBenefit {
  value: string;
  caption?: string;
  /** Числовой акцент vs текстовый label */
  tone: 'metric' | 'label';
}

export interface OfferItem {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  benefit: OfferBenefit;
  /** Параметр цели loyalty_offer_click в Яндекс Метрике */
  goalOffer: 'referral' | 'payment_delay' | 'competitor_offer';
}

export const offersSectionCopy = {
  id: 'offers' as const,
  title: 'Выгодные условия для постоянных клиентов',
  subtitle:
    'Стоимость поставки зависит не только от объёма и маршрута. Для постоянных клиентов предусмотрены дополнительные условия — расскажите о вашей задаче, и менеджер проверит, что можно предложить именно вашей компании.',
  highlight: {
    title: 'Уже получили предложение на топливо?',
    description:
      'Пришлите счёт или коммерческое предложение другого поставщика. Менеджер сравнит условия поставки и сообщит, что мы можем предложить для вашего предприятия.',
    primaryCta: 'Отправить счёт в MAX',
    secondaryCta: 'Связаться с менеджером',
  },
};

export const offerItems: OfferItem[] = [
  {
    number: '01',
    title: 'Порекомендуйте нас партнёру',
    description:
      'Если по вашей рекомендации к нам обращается новая компания, предоставим скидку 50 коп./л на следующий заказ.',
    ctaLabel: 'Узнать условия',
    goalOffer: 'referral',
    benefit: {
      value: '−50 коп./л',
      caption: 'на следующую поставку',
      tone: 'metric',
    },
  },
  {
    number: '02',
    title: 'Нужна отсрочка платежа?',
    description:
      'Для постоянных клиентов можем предоставить отсрочку оплаты нефтепродуктов сроком до 45 дней. Условия согласовываются индивидуально.',
    ctaLabel: 'Обсудить условия',
    goalOffer: 'payment_delay',
    benefit: {
      value: 'до 45 дней',
      tone: 'metric',
    },
  },
  {
    number: '03',
    title: 'Уже работаете с другим поставщиком?',
    description: 'Есть предложение другого поставщика? Пришлите его нам — сравним условия поставки.',
    ctaLabel: 'Отправить счёт',
    goalOffer: 'competitor_offer',
    benefit: {
      value: 'Сравним предложение',
      tone: 'label',
    },
  },
];
