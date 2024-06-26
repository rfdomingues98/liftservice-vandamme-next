'use client'

import {cn} from '@/lib/utils'
import {zodResolver} from '@hookform/resolvers/zod'
import {useTranslations} from 'next-intl'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useFormState} from 'react-dom'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'
import {Button} from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {Input} from '../ui/input'
import {Textarea} from '../ui/textarea'
import {onSubmitAction} from './actions'
import {FormSchema, MAX_LENGTH, MIN_LENGTH} from './schema'

type Props = {
  className?: string
}

export function ContactsForm({className}: Props) {
  const t = useTranslations('contacts')
  const [pending, setPending] = useState(false)

  const [state, formAction] = useFormState(onSubmitAction, {
    message: '',
  })

  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      message: '',
    },
  })

  const onSuccess = useCallback(
    function () {
      toast.success(t('_successAlert'))
      form.reset()
      setPending(false)
    },
    [form, t]
  )
  const onError = useCallback(
    function () {
      toast.error(t('_errorAlert'))
      setPending(false)
      form.reset()
    },
    [form, t]
  )

  useEffect(() => {
    if (state?.message === 'success') onSuccess()
    else if (state?.message !== '') onError()
    else setPending(false)
  }, [state, onSuccess, onError])

  function onClear() {
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault()
          setPending(true)
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!))
          })(evt)
        }}
        className={cn(className)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {t('_nameFormLabel')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastname'
          render={({field}) => (
            <FormItem className='hidden'>
              <FormLabel>
                Last name <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {t('_emailFormLabel')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({field}) => (
            <FormItem>
              <FormLabel>
                {t('_messageFormLabel')} <span className='text-red-600'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder=''
                  className='resize-none min-h-36'
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
                  {...field}
                />
              </FormControl>
              <FormDescription className='flex justify-end'>
                {field.value.length ?? 0}/{MAX_LENGTH}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3'>
          <Button
            className='bg-blue-500 hover:bg-blue-500/90 rounded-sm'
            type='submit'
            disabled={pending}
          >
            {t('_sendFormButton')}
          </Button>
          <Button
            className='bg-blue-100 hover:bg-blue-100/90 text-blue-600 rounded-sm'
            type='button'
            onClick={onClear}
          >
            {t('_resetFormButton')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
