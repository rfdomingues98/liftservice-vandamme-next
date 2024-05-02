'use server'
import {env} from '@/env.mjs'
import nodemailer from 'nodemailer'
import {FormSchema} from './schema'

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  const parsed = FormSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue: {message: any}) => issue.message),
    }
  }

  const {name, email, message, lastname} = parsed.data
  if (lastname) return {message: 'Invalid form data. Bot detected.'}

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `${name} <${email}>`,
    to: env.SMTP_USER,
    subject: `Contact Form Message from ${name}`,
    text: message,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return {message: `Email could not be sent with error: ${error}`}
    }
  })

  return {message: 'success'}
}
