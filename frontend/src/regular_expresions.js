export const esTexto = data => {
  if (data === (null, undefined, "")) {
    return false
  } else {
    return !/[^A-Za-z\s\,]/.test(data)
  }
}

export const esCorreo = data => {
  if (data === (null, undefined, "")) {
    return false
  } else {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(data)
  }
}
