import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';

describe('Button component', () => {
  it('renders label and responds to press', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Clique" onPress={onPress} />);
    const btn = getByText('Clique');
    expect(btn).toBeTruthy();
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalled();
  });
});
