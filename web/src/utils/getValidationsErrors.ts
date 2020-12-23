import { ValidationError } from "yup";

interface ValidationProps {
  [key: string]: string;
}

export default function getValidationErros(
  err: ValidationError
): ValidationProps {
  const errors: ValidationProps = {};

  err.inner.forEach((error) => {
    errors[error.path] = error.message;
  });

  return errors;
}
