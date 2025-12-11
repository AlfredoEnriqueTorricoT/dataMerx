import * as Yup from 'yup'
import { WatchValidationRules } from './watchValidationRules'

/**
 * Schema para crear un watch
 */
export const createWatchSchema = Yup.object().shape({
  code: Yup.string()
    .required(WatchValidationRules.code.messages.required)
    .min(WatchValidationRules.code.minLength, WatchValidationRules.code.messages.minLength)
    .max(WatchValidationRules.code.maxLength, WatchValidationRules.code.messages.maxLength),
  imei: Yup.string()
    .required(WatchValidationRules.imei.messages.required)
    .matches(WatchValidationRules.imei.pattern, WatchValidationRules.imei.messages.pattern)
    .min(WatchValidationRules.imei.minLength, WatchValidationRules.imei.messages.minLength)
    .max(WatchValidationRules.imei.maxLength, WatchValidationRules.imei.messages.maxLength),
})

/**
 * Schema para editar un watch
 */
export const updateWatchSchema = Yup.object().shape({
  imei: Yup.string()
    .required(WatchValidationRules.imei.messages.required)
    .matches(WatchValidationRules.imei.pattern, WatchValidationRules.imei.messages.pattern)
    .min(WatchValidationRules.imei.minLength, WatchValidationRules.imei.messages.minLength)
    .max(WatchValidationRules.imei.maxLength, WatchValidationRules.imei.messages.maxLength),
  modem_imei: Yup.string()
    .required(WatchValidationRules.modemImei.messages.required)
    .matches(WatchValidationRules.modemImei.pattern, WatchValidationRules.modemImei.messages.pattern)
    .min(WatchValidationRules.modemImei.minLength, WatchValidationRules.modemImei.messages.minLength)
    .max(WatchValidationRules.modemImei.maxLength, WatchValidationRules.modemImei.messages.maxLength),
})

/**
 * Schema para configurar un watch
 */
export const configureWatchSchema = Yup.object().shape({
  platform_id: Yup.number()
    .required(WatchValidationRules.platformId.messages.required)
    .positive(WatchValidationRules.platformId.messages.positive),
  device_imei: Yup.string()
    .required(WatchValidationRules.imei.messages.required)
    .matches(WatchValidationRules.imei.pattern, WatchValidationRules.imei.messages.pattern)
    .min(WatchValidationRules.imei.minLength, WatchValidationRules.imei.messages.minLength)
    .max(WatchValidationRules.imei.maxLength, WatchValidationRules.imei.messages.maxLength),
})
