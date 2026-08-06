'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { callbackFormSchema, type CallbackFormData } from '@/validation/forms';
import { Button, Input } from '@/components/ui';
import { FormLegalConsent, FormLegalNotice } from '@/components/legal';
import { useConsentGate } from './useConsentGate';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const SUBMIT_LABEL = 'Заказать звонок';

export function CallbackForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const lastSubmitRef = useRef(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: {
      personalDataConsent: false,
    },
  });

  const consentGiven = Boolean(watch('personalDataConsent'));
  const { consentError, onDisabledSubmitClick } = useConsentGate(
    consentGiven,
    errors.personalDataConsent?.message,
  );

  const onSubmit = async (data: CallbackFormData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setStatus('error');
      setMessage('Подождите несколько секунд перед повторной отправкой');
      return;
    }
    lastSubmitRef.current = now;

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/callback', {
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

      <FormLegalConsent
        {...register('personalDataConsent')}
        error={consentError}
      />

      <div onClick={onDisabledSubmitClick}>
        <Button
          type="submit"
          loading={status === 'loading'}
          fullWidth
          disabled={!consentGiven}
        >
          {SUBMIT_LABEL}
        </Button>
      </div>

      <FormLegalNotice submitLabel={SUBMIT_LABEL} />

      <div aria-live="polite" aria-atomic="true">
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
