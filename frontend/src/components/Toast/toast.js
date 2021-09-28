import toastr from "toastr"
import "toastr/build/toastr.min.css"

function showToast(props) {
  const toastConfig = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: props.timeOut !== undefined ? props.timeOut : "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }
  toastr.options = toastConfig

  // setTimeout(() => toastr.success(`Settings updated `), 300)
  //Toaster Types
  toastr[props.toastType](props.message, props.title)
}

function clearToast() {
  toastr.clear()
}

export { showToast, clearToast }
