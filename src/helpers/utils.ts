import jwt_decode from "jwt-decode";
import { Size } from "@/types/index";

export const getObjSubset = <V extends Record<string, any>, K extends keyof V>(
  obj: V,
  keys: K[]
) => {
  let return_obj: any = {};

  for (let i = 0; i < keys.length; i++) {
    return_obj[keys[i]] = obj[keys[i]];
  }

  return return_obj as Pick<V, typeof keys[number]>;
};

export const deepCopy = (value: any) => {
  if (!value) return;

  return JSON.parse(JSON.stringify(value));
};

export const getNumber = (value?: string | number) => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  return parseInt(value);
};

export const getSize = (size: Size | boolean) => {
  let parseSize: Size = "md";
  if (typeof size === "boolean") {
    if (size) parseSize = "sm";
    else parseSize = "md";
  } else {
    parseSize = size;
  }
  return parseSize;
};

export const makeTextSize = (size: Size | boolean) => {
  let parseSize = getSize(size);

  switch (parseSize) {
    case "sm":
      return ["text-xs"];
    case "md":
      return ["text-sm"];
    default:
      return [];
  }
};

export const makePaddingY = (size: Size | boolean) => {
  let parseSize = getSize(size);

  switch (parseSize) {
    case "sm":
      return ["py-2"];
    case "md":
      return ["py-2"];
    default:
      return ["py-3"];
  }
};

export const uuid = () => {
  return Math.random().toString(16).slice(2);
};

export const isExpiredToken = (token?: string) => {
  if (!token) return true;

  const { exp } = jwt_decode<{ exp: number }>(token);
  const now = new Date().getTime() / 1000;

  return exp < now;
};

export const pickedObj = <T>(keys: (keyof T)[], obj: T) => {
  const picked: Partial<T> = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    picked[key] = obj[key];
  }
  return picked;
};

export const parseObjAsFormData = (obj: Record<string, any>) => {
  const formData = new FormData();

  for (const key in obj) {
    const data = obj[key];
    formData.append(key, data);
  }

  return formData;
};

export const removeEmptyKeys = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    const data = obj[key];
    if (![null, undefined].includes(data)) newObj[key] = data;
  }
  return newObj;
};

export const objHasFile = (obj: Record<string, any>) => {
  const newObj = removeEmptyKeys(obj);

  for (const key in newObj) {
    const data = obj[key];
    if (data instanceof File || data instanceof FileList) return true;
  }
  return false;
};

export const isSavable = (method?: string) => {
  if (!method) return false;
  const methodLower = method.toLocaleLowerCase()
  return ["post", "put", "patch"].includes(methodLower);
};
