import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TasksProps} from './index';
import {FlatList} from 'react-native';
export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding-top: ${getStatusBarHeight() + 16}px;
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'NerkoOneRegular';
  line-height: 24px;
`;
export const UserName = styled.Text`
  color: #ff9000;
`;
export const Menu = styled.View`
  flex-direction: row;
  padding-right: 8px;
`;

export const ProfileButton = styled.TouchableOpacity``;
export const ProfileIcon = styled(FeatherIcon)`
  color: #ff9000;
  font-size: 20px;
`;

export const AddButton = styled.TouchableOpacity`
  margin: 0 16px;
`;
export const AddIcon = styled(FeatherIcon)`
  color: #ff9000;
  font-size: 20px;
`;

export const SignOutButton = styled.TouchableOpacity``;
export const SignOutIcon = styled(FeatherIcon)`
  color: #ff9000;
  font-size: 20px;
`;

export const TaskList = styled(FlatList as new () => FlatList<TasksProps>)`
  padding: 32px 24px 16px;
`;

export const TaskContainer = styled.View`
  background: #3e3b47;
  height: 120px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;
export const TaskInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;
export const TaskName = styled.Text`
  font-family: 'LatoRegular';
  font-size: 20px;
  color: #f4ede8;
`;
export const TaskDescription = styled.Text`
  font-size: 16px;
  width: 100px;
  color: #f4ede8;
`;

export const TaskDateContainer = styled.View`
  flex-direction: column;
  margin-top: 8px;
`;

export const TaskDateText = styled.Text`
  padding-right: 8px;
  color: #f4ede8;
`;

export const MenuTask = styled.View`
  flex-direction: row;
`;

export const MenuButton = styled.TouchableOpacity`
  margin: 0 4px;
`;

export const TrashIcon = styled(FeatherIcon)`
  color: #ff1100;
  font-size: 20px;
`;
export const EditIcon = styled(FeatherIcon)`
  color: #efff00;
  font-size: 20px;
`;

export const NoTaskContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const NoTaskText = styled.Text`
  font-size: 24px;
  color: #ff9000;
  font-family: 'NerkoOneRegular';
`;
