import React, {useCallback, useRef} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {Container, Title, BackToSignIn, BackToSignInText} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';
interface SingUpDate {
  name: string;
  email: string;
  password: string;
}
const SingUp: React.FC = () => {
  const {goBack} = useNavigation();
  const cellInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback(async (data: SingUpDate) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio!'),
        email: Yup.string()
          .required('E-mail é obrigatorio!')
          .email('Digite um e-mail valido'),
        password: Yup.string().required('Senha é obrigatorio!'),
        cell: Yup.string().required('Telefone orbigatorio'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      Alert.alert(
        'Cadastro realizado com sucesso',
        'Voce ja pode fazer login na aplicacao',
      );

      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na autenticacao',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form onSubmit={handleSignUp} ref={formRef} style={{width: '100%'}}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => cellInputRef.current?.focus()}
              />
              <Input
                ref={cellInputRef}
                name="cell"
                icon="phone"
                placeholder="Celular"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Criar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          goBack();
        }}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText>Voltar para o logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SingUp;
