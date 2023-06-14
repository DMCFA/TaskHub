import { render, screen, fireEvent } from '@testing-library/react';
import {
  CustomThemeProvider,
  ThemeContext,
} from '../../styles/themes/ThemeContext';
import Navbar from '../../app/components/Nav/Navbar';
import { useContext } from 'react';

describe('CustomThemeProvider', () => {
  test('renders children', () => {
    render(
      <CustomThemeProvider>
        <div>
          <p>test children</p>
        </div>
      </CustomThemeProvider>
    );

    expect(screen.getByText('test children')).toBeInTheDocument();
  });

  test('toggles theme on click', () => {
    render(
      <CustomThemeProvider>
        <Navbar />
      </CustomThemeProvider>
    );

    const themeButton = screen.getByRole('button');
    fireEvent.click(themeButton);

    expect(themeButton).toHaveAttribute('data-theme', 'dark');
  });
});
