import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  padding-top: ${getStatusBarHeight() + 16}px;
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  align-items: center;
`;
export const BackButton = styled(RectButton)``;
export const HeaderTitle = styled.Text`
  color: #f5ede8;
  margin-left: 16px;
  font-size: 20px;
  font-family: 'NerkoOneRegular';
`;

export const FormContainer = styled.View`
  padding: 24px;
`;

export const FormTitle = styled.Text`
  color: #ff9000;
  font-size: 24px;
  font-family: 'NerkoOneRegular';
  margin-bottom: 16px;
`;

export const InitialDateButton = styled(RectButton)`
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;
export const InitialDateText = styled.Text`
  font-family: 'NerkoOneRegular';
  font-size: 20px;
`;


export const EndDateButton = styled(RectButton)`
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;
export const EndDateText = styled.Text`
  font-family: 'NerkoOneRegular';
  font-size: 20px;
`;

export const AddTaskButton = styled.TouchableOpacity`
  height: 56px;
  width: 100%;
  background: #ff9000;
  position: absolute;
  justify-content: center;
  align-items: center;

  left: 0;
  right:0;
  bottom: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;
`

export const AddTaskButtonText = styled.Text`
  font-family: 'NerkoOneRegular';
  font-size: 20px;
`;
