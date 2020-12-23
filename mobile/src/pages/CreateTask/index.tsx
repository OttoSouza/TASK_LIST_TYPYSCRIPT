import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  FormContainer,
  FormTitle,
  InitialDateButton,
  InitialDateText,
  EndDateButton,
  EndDateText,
  AddTaskButton,
  AddTaskButtonText,
} from './styles';
import * as Yup from 'yup';

import FeatherIcon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {Alert, Platform} from 'react-native';
import CreateInput from '../../components/CreateInput';
import {TasksProps} from '../DashBoard';
interface RouteParams {
  userId: string;
  userName: string;
  taskId: string;
  data: TasksProps;
}

const CreateTask: React.FC = () => {
  const [task_name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setError] = useState(false);
  const {params} = useRoute();
  const routeParams = params as RouteParams;
  const firstName = routeParams.userName.split(' ');
  const {goBack} = useNavigation();
  const [showInitialDatePicker, setShowInitialDatePicker] = useState(false);
  const [initial_date, setSelectedInicialDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [end_date, setSelectedEndDate] = useState(new Date());

  const handleToggleInitialDatePicker = useCallback(() => {
    setShowInitialDatePicker((state) => !state);
  }, []);

  const handleToggleEndDatePicker = useCallback(() => {
    setShowEndDatePicker((state) => !state);
  }, []);

  const handleInicitalDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowInitialDatePicker(false);
      }
      //date
      if (date) {
        setSelectedInicialDate(date);
      }
    },
    [],
  );

  const handleEndDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowEndDatePicker(false);
      }
      //date
      if (date) {
        setSelectedEndDate(date);
      }
    },
    [],
  );

  const handleCreateTask = async () => {
    try {
      const schema = Yup.object().shape({
        task_name: Yup.string().required('Nome da tarefa obrigatoria'),
      });

      const data = {task_name, description, initial_date, end_date};

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!routeParams.taskId) {
        await api.post('/tasks', data);
      } else {
        await api.put(`tasks/${routeParams.data.id}`, data);
        Alert.alert('Tarefa atualizada com sucesso.');
      }

      goBack();

      Alert.alert('Tarefa cadastrada com sucesso.');
    } catch (error) {
      setError(error);

      // disparar um toask
      Alert.alert(
        'Erro ao cadastrar uma tarefa',
        'Por favor preecha os campos obrigatorio.',
      );
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <FeatherIcon name="arrow-left" size={20} color="#f5ede8" />
        </BackButton>
        <HeaderTitle>{firstName[0]}, vamos adicionar uma tarefa?</HeaderTitle>
      </Header>

      <FormContainer>
        <FormTitle>Preencha os campos</FormTitle>

        <CreateInput
          placeholder="Nome da tarefa"
          value={task_name}
          icon="user"
          myError={message}
          onChangeText={(text) => setTaskName(text)}
          defaultValue={routeParams.taskId ? routeParams.data.task_name : ''}
        />

        <CreateInput
          placeholder="Nome da tarefa"
          defaultValue={routeParams.taskId ? routeParams.data.description : ''}
          value={description}
          icon="list"
          onChangeText={setDescription}
        />

        <InitialDateButton onPress={handleToggleInitialDatePicker}>
          <InitialDateText>Selecionar data inicio</InitialDateText>
        </InitialDateButton>

        {showInitialDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour
            display="calendar"
            value={
              routeParams.taskId
                ? new Date(routeParams.data.initial_date)
                : initial_date
            }
            onChange={handleInicitalDateChanged}
          />
        )}

        {/* end Date */}

        <EndDateButton onPress={handleToggleEndDatePicker}>
          <EndDateText>Selecionar de conclusao</EndDateText>
        </EndDateButton>

        {showEndDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour
            display="calendar"
            value={
              routeParams.taskId
                ? new Date(routeParams.data.end_date)
                : end_date
            }
            onChange={handleEndDateChanged}
          />
        )}
      </FormContainer>
      <AddTaskButton onPress={handleCreateTask}>
        <AddTaskButtonText>
          {routeParams.taskId ? 'Atualizar' : 'Adicionar'}
        </AddTaskButtonText>
      </AddTaskButton>
    </Container>
  );
};

export default CreateTask;
