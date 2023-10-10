import { toast } from 'react-toastify';

export function vh(v:any) {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

export function vw(v:any) {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}
export const handleErrors = (error: any, callback?:any) => {
  const errorResponse = error?.response?.data;
  if (errorResponse?.length && Array.isArray(errorResponse)) {
    errorResponse.forEach((err: any) => {
      toast.error(err, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    callback && callback();
  } else if (typeof errorResponse === 'string') {
    toast.error(errorResponse || error?.response?.data?.defaultMessage || error?.response?.error || error?.response?.data?.message || 'There are errors on sever side', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    callback && callback();
  } else {
    toast.error(error?.response?.data?.defaultMessage || error?.response?.error || error?.response?.data?.message || 'There are errors on sever side', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    callback && callback();
  }
};

export default function formatCurrency(number:number, type:string = 'ja-JP', currency:string = 'JPY', style:string = '') {
  const config = style !== '' ? { style, currency } : { currency }; // style: currency
  const res = new Intl.NumberFormat(type, config).format(number);
  return res;
}
// eslint-disable-next-line import/prefer-default-export
export function stringToBoolean(value:string | null) {
  switch (value) {
    case 'true': case 'yes': case '1': return true;
    case 'false': case 'no': case '0': case null: return false;
    default: return Boolean(value);
  }
}

export const formatNumber = (num:string) => {
  if (num === '') {
    return '';
  }
  const temp = Number(num.replace(/,/g, ''));
  const dotAvailable = num.includes('.');

  // eslint-disable-next-line no-useless-escape
  if (Number.isNaN(temp) && /^[\+\-]?\d*\.?\,?\d+(?:[Ee][\+\-]?\d+)?$/i.test(
    num,
  ) === false) {
    return num;
  }
  const displayDotAvaiAble = () => {
    if (dotAvailable) {
      return `.${num.split('.')[1]}`;
    }
    return '';
  };
  const p = temp.toFixed(2).split('.');
  // eslint-disable-next-line consistent-return
  return `${p[0].split('').reverse().reduce((curr, next, index) => (next + ((index !== 0 && (index % 3 === 0)) ? ',' : '') + curr), '')}${displayDotAvaiAble()}`;
};
