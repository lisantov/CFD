export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateField = (value: string): ValidationResult => {
  if (/^\s*$/gi.test(value)) return { valid: true, message: "" };
  else if(value[0] === ' ') return { valid: false, message: "Поле не может начинаться с пробела" };
  else return { valid: false, message: "Поле не может быть пустым" };
}
