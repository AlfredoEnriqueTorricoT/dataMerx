declare module 'components/tableElements' {
  import { FC, ReactNode } from 'react'

  interface SearchBarProps {
    _onChange: (value: string) => void
    _value: string
  }

  interface HeaderName {
    name: string
    arrow: boolean
  }

  interface THeaderSorterProps {
    sorter: number
    setSorter: (sorter: number) => void
    headerNames: HeaderName[]
  }

  interface MobileDataShowProps {
    title: string
    desc: ReactNode
  }

  interface ErrorTableProps {
    retryFunction: () => void
    cod: string | number
    children?: ReactNode
  }

  interface ButtonListItem {
    _label: string
    [key: string]: any
  }

  interface OptionsButtonProps {
    buttonsList: ButtonListItem[]
  }

  interface DropdownButtonItem {
    title: string
    [key: string]: any
  }

  interface DropdownButtonProps {
    title: ReactNode
    buttons: DropdownButtonItem[]
    className?: string
  }

  export const SearchBar: FC<SearchBarProps>
  export const THeaderSorter: FC<THeaderSorterProps>
  export const MobileDataShow: FC<MobileDataShowProps>
  export const ErrorTable: FC<ErrorTableProps>
  export const OptionsButton: FC<OptionsButtonProps>
  export const DropdownButton: FC<DropdownButtonProps>
  export const EmptyData: FC
}
