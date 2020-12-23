import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CreateInput from '../../components/CreateInput';
import {useAuth} from '../../hooks/AuthContext';
import api from '../../services/api';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  FormContainer,
  FormTitle,
  PasswordContainer,
  AddTaskButton,
  AddTaskButtonText,
} from './styles';

const Profile: React.FC = () => {
  const {user, updateUser} = useAuth();
  const {goBack} = useNavigation();
  const firstName = user.name.split(' ');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cell, setCell] = useState(user.cell);
  const [old_password, setOldPassword] = useState('');
  const [password, setNewPassword] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const data = {
        name,
        email,
        cell,
        old_password,
        password,
      };
      const formData = Object.assign(
        {
          name: data.name,
          email: data.email,
          cell: data.cell,
        },
        data.old_password
          ? {
              old_password: data.old_password,
              password: data.password,
            }
          : {},
      );
      const response = await api.put('/users', formData);

      updateUser(response.data);
      Alert.alert('Perfil atualizado com sucesso');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header>
        <BackButton onPress={goBack}>
          <FeatherIcon name="arrow-left" size={20} color="#f5ede8" />
        </BackButton>
        <HeaderTitle>{firstName[0]}</HeaderTitle>
      </Header>
      <KeyboardAvoidingView
        style={{flex: 1, marginBottom: 40}}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <FormContainer>
              <View>
                <FormTitle>Perfil do usuario</FormTitle>
              </View>

              <CreateInput
                placeholder="Nome"
                icon="user"
                defaultValue={name}
                value={name}
                onChangeText={setName}
              />
              <CreateInput
                placeholder="E-mail"
                icon="mail"
                defaultValue={email}
                value={email}
                onChangeText={setEmail}
              />
              <CreateInput
                placeholder="Telefone"
                icon="phone"
                defaultValue={cell}
                value={cell}
                onChangeText={setCell}
              />
              <PasswordContainer>
                <CreateInput
                  placeholder="Senha antiga"
                  icon="key"
                  value={old_password}
                  onChangeText={setOldPassword}
                  secureTextEntry
                />
                <CreateInput
                  placeholder="Nova senha"
                  icon="key"
                  secureTextEntry
                  value={password}
                  onChangeText={setNewPassword}
                />
              </PasswordContainer>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <AddTaskButton onPress={handleUpdateProfile}>
        <AddTaskButtonText>Atualizar</AddTaskButtonText>
      </AddTaskButton>
    </>
  );
};

export default Profile;
