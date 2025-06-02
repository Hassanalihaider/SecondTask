import { LinkingOptions } from '@react-navigation/native';
import { AppStackParamList } from '../../navigators/AppStackParamList';

export const linking: LinkingOptions<AppStackParamList> = {
  prefixes: ['secondtask://'],
  config: {
    screens: {
      PersistScreen: 'persist',
      Profile: {
        path: 'profile',
        screens: {
          ProfileHome: '',
        },
      },
      ProfilePostDetail: 'profile/post/:id',
    },
  },
};
