import 'formik'
import { FormHTMLAttributes, DetailedHTMLProps } from 'react'

declare module 'formik' {
  export interface FormProps extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit' | 'onReset'> {
    children?: React.ReactNode
  }
}
