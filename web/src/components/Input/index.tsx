import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import { Container, Error } from "../../styles/input";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  icon: React.ComponentType<IconBaseProps>;
  contentStyle?: object;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, contentStyle,...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, error, registerField, defaultValue } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    //se tiver algum valor dentro do input
    //deixe com cor e borda
    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, []);

  const handleIsFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error} style={contentStyle}>
      {Icon && <Icon size={20} />}
      <input
        {...rest}
        ref={inputRef}
        onFocus={handleIsFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
