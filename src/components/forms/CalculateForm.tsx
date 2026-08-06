'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculateFormSchema, type CalculateFormData } from '@/validation/forms';
import { Button, Input, Select } from '@/components/ui';
import { FormLegalConsent, FormLegalNotice } from '@/components/legal';
import { useConsentGate } from './useConsentGate';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SUBMIT_LABEL = 'Получить расчёт';

interface CalculateFormProps {
  productOptions: { value: string; label: string }[];
}

export function CalculateForm({ productOptions }: CalculateFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const lastSubmitRef = useRef(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CalculateFormData>({
    resolver: zodResolver(calculateFormSchema),
    defaultValues: {
      personalDataConsent: false,
    },
  });

  const consentGiven = Boolean(watch('personalDataConsent'));
  const { consentError, onDisabledSubmitClick } = useConsentGate(
    consentGiven,
    errors.personalDataConsent?.message,
  );

  const onSubmit = async (data: CalculateFormData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setStatus('error');
      setMessage('Подождите несколько секунд перед повторной отправкой');
      return;
    }
    lastSubmitRef.current = now;

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Ошибка отправки');
      }
    } catch {
      setStatus('error');
      setMessage('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Select
        label="Вид топлива"
        options={productOptions}
        placeholder="Выберите топливо"
        error={errors.product?.message}
        required
        {...register('product')}
      />
      <Input
        label="Объём (литров)"
        type="number"
        min="1"
        placeholder="Например, 5000"
        error={errors.volume?.message}
        required
        {...register('volume')}
      />
      <Input
        label="Населённый пункт"
        placeholder="Город или посёлок доставки"
        error={errors.locality?.message}
        required
        {...register('locality')}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Имя"
          placeholder="Ваше имя"
          error={errors.name?.message}
          required
          {...register('name')}
        />
        <Input
          label="Телефон"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          error={errors.phone?.message}
          required
          {...register('phone')}
        />
      </div>

      <FormLegalConsent
        {...register('personalDataConsent')}
        error={consentError}
      />

      <div onClick={onDisabledSubmitClick}>
        <Button
          type="submit"
          loading={status === 'loading'}
          fullWidth
          size="lg"
          variant="green"
          disabled={!consentGiven}
        >
          {SUBMIT_LABEL}
        </Button>
      </div>

      <FormLegalNotice submitLabel={SUBMIT_LABEL} />

      <div aria-live="polite" aria-atomic="true" className="text-center">
        {status === 'success' && (
          <p className="text-sm text-brand-green font-medium">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
