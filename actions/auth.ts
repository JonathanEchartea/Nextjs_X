import { SignupFormSchema, FormState } from '@/lib/definitions'
import { createSession } from '@/lib/session'
import SessionModel from '@/model/SessionModel'
import { redirect } from 'next/navigation'

export async function SignInAction(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  if (validatedFields.data.email === 'admin@example.com' && validatedFields.data.password === 'password') {
    const payload: SessionModel = {
      userId: 'admin',
      name: 'Admin User',
      email: validatedFields.data.email,
      role: 'admin',
    }
    await createSession(payload)
    redirect('/')
  }

  return {
    message: 'Invalid email or password',
  }
}