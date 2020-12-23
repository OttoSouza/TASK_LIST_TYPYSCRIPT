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
import {
  Container,
  Title,
  RegisterAccountButton,
  RegisterAccountButtonText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationsErrors';
import {useAuth} from '../../hooks/AuthContext';
interface SigninForm {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const {signIn, user} = useAuth();
  const handleSignIn = useCallback(async (data: SigninForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatorio!')
          .email('Digite um e-mail valido'),
        password: Yup.string().required('Senha é obrigatorio!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErros(error);
        formRef.current?.setErrors(errors);
        return;
      }

      // disparar um toask
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
              <Title>Faça seu logon</Title>
            </View>
            <Form onSubmit={handleSignIn} ref={formRef} style={{width: '100%'}}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterAccountButton
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <RegisterAccountButtonText>Criar conta</RegisterAccountButtonText>
      </RegisterAccountButton>
    </>
  );
};

export default SignIn;
