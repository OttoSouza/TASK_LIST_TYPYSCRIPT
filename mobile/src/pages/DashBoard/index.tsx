import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useAuth} from '../../hooks/AuthContext';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  Menu,
  ProfileButton,
  ProfileIcon,
  AddButton,
  AddIcon,
  SignOutButton,
  SignOutIcon,
  TaskList,
  TaskInfo,
  TaskContainer,
  TaskName,
  TaskDescription,
  TaskDateContainer,
  TaskDateText,
  MenuTask,
  MenuButton,
  TrashIcon,
  EditIcon,
  NoTaskContainer, 
  NoTaskText
} from './styles';
import api from '../../services/api';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export interface TasksProps {
  id: string;
  task_name: string;
  description: string;
  initial_date: string;
  end_date: string;
  initialFormatted: string;
  endFormatted: string;
}

const DashBoard: React.FC = () => {
  const {user, signOut} = useAuth();
  const {navigate} = useNavigation();
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, []);

  const navigateTask = useCallback(
    (userId: string, userName: string, taskId?: string, data?: TasksProps) => {
      navigate('CreateTask', {userId, userName, taskId, data});
    },
    [],
  );

  useEffect(() => {
    api.get<TasksProps[]>('tasks').then((response) => {
      const taskFormatted = response.data.map((task) => {
        return {
          ...task,
          initialFormatted: format(
            parseISO(task.initial_date),
            "dd'/'MM'/'yyyy",
            {locale: ptBR},
          ),
          endFormatted: format(parseISO(task.end_date), "dd'/'MM'/'yyyy", {
            locale: ptBR,
          }),
        };
      });
      setTasks(taskFormatted);
    });
  }, [tasks]);

  const handleDeleteTask = useCallback(async (id: string) => {
    await api.delete(`tasks/${id}`);
  }, []);
  return (
    <Container>
      <StatusBar backgroundColor="#28262e" />
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <Menu>
          <ProfileButton onPress={navigateToProfile}>
            <ProfileIcon name="user" />
          </ProfileButton>

          <AddButton onPress={() => navigateTask(user.id, user.name)}>
            <AddIcon name="plus" />
          </AddButton>

          <SignOutButton onPress={signOut}>
            <SignOutIcon name="log-out" />
          </SignOutButton>
        </Menu>
      </Header>

      {tasks.length ? (
        <TaskList
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({item: task}) => (
            <TaskContainer>
              <TaskInfo>
                <TaskName>{task.task_name}</TaskName>
                <TaskDescription>{task.description}</TaskDescription>
                <TaskDateContainer>
                  <TaskDateText>Inicio: {task.initialFormatted}</TaskDateText>
                  <TaskDateText>Fim: {task.endFormatted}</TaskDateText>
                </TaskDateContainer>
              </TaskInfo>
              <MenuTask>
                <MenuButton onPress={() => handleDeleteTask(task.id)}>
                  <TrashIcon name="trash" />
                </MenuButton>
                <MenuButton
                  onPress={() =>
                    navigateTask(user.id, user.name, task.id, task)
                  }>
                  <EditIcon name="edit" />
                </MenuButton>
              </MenuTask>
            </TaskContainer>
          )}
        />
      ) : (
        <NoTaskContainer>
          <NoTaskText>Nenhuma tarefa cadastrada</NoTaskText>
        </NoTaskContainer>
      )}
    </Container>
  );
};

export default DashBoard;
