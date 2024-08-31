import React from 'react';
import { render } from '@testing-library/react';
import MyProfileDash from '../MyProfileDash';

test('renders welcome message', () => {
     render(<MyProfileDash />);
});