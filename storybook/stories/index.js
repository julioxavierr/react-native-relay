import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';
import RowItem from './RowItem';
import User from './User';
import UserList from './UserList';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('RowItem', module).add('to Storybook', () => <RowItem/>);

storiesOf('User', module).add('to Storybook', () => <User/>);

storiesOf('UserList', module).add('to Storybook', () => <UserList RowItem={<RowItem/>} />);