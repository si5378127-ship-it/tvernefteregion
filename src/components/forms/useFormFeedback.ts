'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseFormWatch, FieldValues } from 'react-hook-form';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Локальный success/error для одной формы.
 * Сообщение сбрасывается при новом вводе; reset после success не гасит сообщение сразу.
 */
export function useFormFeedback<T extends FieldValues>(watch: UseFormWatch<T>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const suppressClearRef = useRef(false);

  useEffect(() => {
    const subscription = watch(() => {
      if (suppressClearRef.current) return;
      setStatus((current) => {
        if (current === 'success' || current === 'error') {
          setMessage('');
          return 'idle';
        }
        return current;
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Не оставляем success на пустой форме после reset надолго.
  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const beginSubmit = useCallback(() => {
    setStatus('loading');
    setMessage('');
  }, []);

  const setSuccess = useCallback((nextMessage: string) => {
    suppressClearRef.current = true;
    setStatus('success');
    setMessage(nextMessage);
    queueMicrotask(() => {
      suppressClearRef.current = false;
    });
  }, []);

  const setError = useCallback((nextMessage: string) => {
    setStatus('error');
    setMessage(nextMessage);
  }, []);

  const clearFeedback = useCallback(() => {
    setStatus('idle');
    setMessage('');
  }, []);

  return { status, message, beginSubmit, setSuccess, setError, clearFeedback };
}
