import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import {TextInputProps} from 'react-native';
import {Container, TextInput, Icon} from './styles';
import {useField} from '@unform/core';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;

}
interface InputValueRef {
  value: string;
}
interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, icon,...rest},
  ref,
) => {
  const {registerField, defaultValue = '', error, fieldName} = useField(name);
  const inputElementeRef = useRef<any>(null);
  const inputValueRef = useRef<InputValueRef>({value: defaultValue});
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  //passar uma referencia do componente filho para o  pai
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementeRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      //o que vai acontecer com o input  se receber um novo valor do unform
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;

        //ira ser responsavel por mudar visualmente o texto que esta dentro do input
        inputElementeRef.current.setNativeProps({text: value});
      },

      // o que ira acontecer com o input quando o unform precisar limpa-lo
      clearValue() {
        (inputElementeRef.current.value = ''), inputElementeRef.current.clear();
      },
    });
  }, [fieldName, defaultValue]);
  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={24} color={isFocused || isFilled ? "#ff9000" : "#666360" } />
      <TextInput
        ref={inputElementeRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        //obtendo o texto digitado pelo usuario o value e adicionando dentro do inputValueRef
        onChangeText={(value) => (inputValueRef.current.value = value)}
        
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
