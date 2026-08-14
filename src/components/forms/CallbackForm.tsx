'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { callbackFormSchema, type CallbackFormData } from '@/validation/forms';
import { Button, Input } from '@/components/ui';
import { FormLegalConsent, FormLegalNotice } from '@/components/legal';
import { useConsentGate } from './useConsentGate';
import { useFormFeedback } from './useFormFeedback';

const SUBMIT_LABEL = 'Заказать звонок';

export function CallbackForm() {
  const lastSubmitRef = useRef(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      personalDataConsent: false,
    },
  });

  const { status, message, beginSubmit, setSuccess, setError } = useFormFeedback(watch);
  const consentGiven = Boolean(watch('personalDataConsent'));
  const { consentError, onDisabledSubmitClick } = useConsentGate(
    consentGiven,
    errors.personalDataConsent?.message,
  );

  const onSubmit = async (data: CallbackFormData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setError('Подождите несколько секунд перед повторной отправкой');
      return;
    }
    lastSubmitRef.current = now;

    beginSubmit();
    try {
      const res = await fetch('/api/forms/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await res.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;
      if (res.ok && result?.success) {
        reset();
        setSuccess(result.message || 'Заявка принята. Мы свяжемся с вами в ближайшее время.');
      } else {
        console.error('[CallbackForm] submit failed', { status: res.status, result });
        setError(result?.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('[CallbackForm] submit error', error);
      setError('Не удалось отправить заявку. Попробуйте позже.');
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

      <FormLegalConsent {...register('personalDataConsent')} error={consentError} />

      <div onClick={onDisabledSubmitClick}>
        <Button
          type="submit"
          loading={status === 'loading'}
          fullWidth
          disabled={!consentGiven || status === 'loading'}
        >
          {SUBMIT_LABEL}
        </Button>
      </div>

      <FormLegalNotice submitLabel={SUBMIT_LABEL} />

      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <p className="text-sm font-medium text-brand-green">{message}</p>
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
