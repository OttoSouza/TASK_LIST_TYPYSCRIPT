import React, {forwardRef, useState, useCallback} from 'react';
import {TextInputProps} from 'react-native';
import {Container, TextInput, Icon} from './styles';

interface InputProps extends TextInputProps {
  icon: string;
  placeholder: string;
  myError?: boolean;
  value: string;
}

interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {placeholder, myError, icon, value,...rest},
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!true);
  }, []);

  return (
    <Container isFocused={isFocused} isErrored={!!myError}>
      <Icon
        name={icon}
        size={24}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholderTextColor="#666360"
        defaultValue={value}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
