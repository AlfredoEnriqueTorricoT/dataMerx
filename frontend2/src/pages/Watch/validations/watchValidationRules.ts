export const WatchValidationRules = {
  code: {
    minLength: 2,
    maxLength: 50,
    messages: {
      required: 'Ingrese el código del reloj',
      minLength: 'El código debe tener al menos 2 caracteres',
      maxLength: 'El código no puede exceder 50 caracteres',
    },
  },
  imei: {
    pattern: /^\d+$/,
    minLength: 1,
    maxLength: 20,
    messages: {
      required: 'Ingrese el IMEI del reloj',
      pattern: 'El IMEI debe contener solo números',
      minLength: 'El IMEI debe tener al menos 1 dígito',
      maxLength: 'El IMEI no puede exceder 20 dígitos',
    },
  },
  modemImei: {
    pattern: /^\d+$/,
    minLength: 15,
    maxLength: 20,
    messages: {
      required: 'Ingrese el IMEI del modem',
      pattern: 'El IMEI del modem debe contener solo números',
      minLength: 'El IMEI del modem debe tener al menos 15 dígitos',
      maxLength: 'El IMEI del modem no puede exceder 20 dígitos',
    },
  },
  deviceName: {
    maxLength: 100,
    messages: {
      maxLength: 'El nombre del dispositivo no puede exceder 100 caracteres',
    },
  },
  platformId: {
    messages: {
      required: 'Seleccione una plataforma',
      positive: 'La plataforma debe ser válida',
    },
  },
}
