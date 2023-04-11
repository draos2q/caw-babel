import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

type AlertProps = {
  confirmButtonColor?: string,
  cancelButtonColor?: string,
  cancelLabel?: string,
  confirmLabel?: string,
  html?: boolean;
}

type ShowLoadingProps = AlertProps & {
  title?: string,
  position?: SweetAlertPosition,
  timer?: number,
  timerProgressBar?: boolean
}

type confirmAlertProps = AlertProps & {
  title?: string;
  text?: string;
  isWarning?: boolean,
  icon?: SweetAlertIcon;
  footer?: string | null;
}

type ShowAlertProps = AlertProps & {
  title?: string;
  text: string;
  icon?: SweetAlertIcon | "none";
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
};

export const confirmAlert = async (
  { title = 'Confirm',
    text = "Are you sure you want to run this action?",
    cancelLabel = 'Cancel',
    confirmLabel = 'Yes, continue',
    icon = 'question',
    html = false,
    footer = null,
    confirmButtonColor,
    cancelButtonColor,
  }: confirmAlertProps) => {

  const result = await MySwal.fire({
    title: title,
    text: text,
    html: html ? text : '',
    icon: icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    cancelButtonText: cancelLabel,
    confirmButtonText: confirmLabel,
    focusCancel: true,
    allowOutsideClick: false,
    customClass: { container: 'my-swal' },
    reverseButtons: true,
    footer: footer ? footer : undefined
  });

  return result;
};

export const showAlert = async ({
  title = "",
  text = "",
  icon = "success",
  allowOutsideClick = false,
  allowEscapeKey = false,
  html = false,
  confirmButtonColor,
  cancelButtonColor,
}: ShowAlertProps) => {
  const result = await MySwal.fire({
    title: title,
    text: text,
    html: html ? text : "",
    icon: icon === "none" ? undefined : icon,
    confirmButtonColor,
    cancelButtonColor,
    showCloseButton: false,
    allowOutsideClick: allowOutsideClick,
    allowEscapeKey: allowEscapeKey,
    customClass: { container: "my-swal" },
  });
  return result;
};

export const ShowLoading = async (
  { title = '',
    timer
  }:
    ShowLoadingProps
) => {

  let timerInterval: any = null;

  MySwal.fire({
    title: title,
    timer: timer,
    timerProgressBar: true,
    customClass: { container: "my-swal" },
    didOpen: () => {
      MySwal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  });
}

type ShowSelectOptionAlertProps = AlertProps & {
  title?: string,
  text?: string,
  placeHolder?: string,
  inputOptions: ReadonlyMap<string, string> | Record<string, any>
}

export async function showSelectOptionAlert(options: ShowSelectOptionAlertProps) {

  const { cancelButtonColor, confirmButtonColor, html, title, text, confirmLabel, cancelLabel, placeHolder, inputOptions } = options;
  const { value: selectedValue } = await MySwal.fire({
    title,
    text,
    input: 'select',
    html,
    inputOptions,
    cancelButtonColor,
    confirmButtonColor,
    confirmButtonText: confirmLabel || 'Continue',
    cancelButtonText: cancelLabel || 'Cancel',
    inputPlaceholder: placeHolder || 'Select an option',
    showCancelButton: true,
    customClass: { container: "my-swal" },
    reverseButtons: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {

        if (!value)
          resolve('You need to select an option :)')

        resolve('')
      })
    }
  });

  return selectedValue;
}

export const StopLoading = () => {
  if (MySwal)
    MySwal.close();
}