declare module 'components/formElements' {
  import { FC, ReactNode } from 'react'

  interface FormikInputProps {
    label: string
    inputName: string
    type: string
    required?: boolean
    groupId?: string
  }

  interface FormikSelectProps {
    children: ReactNode
    disabled?: boolean
    label: string
    inputName: string
    required?: boolean
    groupId?: string
  }

  export const FormikInput: FC<FormikInputProps>
  export const FormikSelect: FC<FormikSelectProps>
  export const isEmail: (data: string) => boolean
  export const isUrl: (data: string) => boolean
}
