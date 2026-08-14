import { NextResponse } from 'next/server';
import { calculateFormSchema } from '@/validation/forms';
import { processFormSubmission } from '@/services/forms/process-submission';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = calculateFormSchema.safeParse(body);

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
      formType: 'calculate',
      data: parsed.data,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch (error) {
    console.error('[api/forms/calculate]', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}
