import { NextResponse } from 'next/server';
import { callbackFormSchema } from '@/validation/forms';
import { processFormSubmission } from '@/services/forms/process-submission';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = callbackFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Проверьте правильность заполнения формы',
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const result = await processFormSubmission({
      formType: 'callback',
      data: parsed.data,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
