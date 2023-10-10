import { JwtPayloadType } from 'types/authType';

export const getLocalStorage = (itemName: string) => localStorage.getItem(itemName) || '';
export const setLocalStorage = (itemName: string, value: string) => {
  localStorage.setItem(itemName, value);
};
export const removeLocalStorage = (itemName: string) => {
  localStorage.removeItem(itemName);
};

export const getSessionStorage = (itemName: string) => sessionStorage.getItem(itemName) || '';
export const setSessionStorage = (itemName: string, value: string) => {
  sessionStorage.setItem(itemName, value);
};
export const removeSessionStorage = (itemName: string) => {
  sessionStorage.removeItem(itemName);
};

export const decodeJwt = (token: string): JwtPayloadType => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
};
export default Storage;
