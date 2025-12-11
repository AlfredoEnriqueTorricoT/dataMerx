declare module 'components/toast' {
  interface ShowToastProps {
    type: 'success' | 'warning' | 'error' | 'info'
    message: string
    title: string
    timeOut?: string | number
  }

  export function showToast(props: ShowToastProps): void
  export function clearToast(): void
}
