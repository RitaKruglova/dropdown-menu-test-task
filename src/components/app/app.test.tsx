import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from './app';
import { buttonShareText, buttonEditText, buttonDeleteText, menuWidth } from '../../utils/constants';

describe('App Component', () => {
  test('renders MoreButtons and handles click to show dropdown menu', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    const menuItems = screen.getAllByRole('menuitem');

    expect(buttons).toHaveLength(3);
    expect(menuItems).toHaveLength(3);
    expect(menuItems[0]).toHaveTextContent(buttonShareText);
    expect(menuItems[1]).toHaveTextContent(buttonEditText);
    expect(menuItems[2]).toHaveTextContent(buttonDeleteText);
  });

  test('shows context menu on right click', () => {
    render(<App />);

    fireEvent.contextMenu(document);

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    expect(menuItems[0]).toHaveTextContent(buttonShareText);
    expect(menuItems[1]).toHaveTextContent(buttonEditText);
    expect(menuItems[2]).toHaveTextContent(buttonDeleteText);
  });

  test('hides menu on clicking outside', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);

    let menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    fireEvent.click(document);
    menuItems = screen.queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(0);
  });

  test('open menu in the left-bottom direction based on button position', () => {
    render(<App />);
    const button = screen.getAllByRole('button')[0];
    Object.defineProperty(document.documentElement, 'offsetWidth', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(button, 'offsetLeft', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(button, 'offsetTop', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(button, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(button, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    const menu = document.querySelector('ul[role="menu"]');
    if (menu) {
      Object.defineProperty(menu, 'offsetHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(menu, 'offsetWidth', {
        configurable: true,
        value: menuWidth,
      });
    }

    fireEvent.click(button);

    const dropdownMenu = screen.getByRole('menu');
    expect(dropdownMenu.style.left).toBe('200px');
    expect(dropdownMenu.style.top).toBe('250px');
  });

  test('open menu in the right-bottom direction based on button position', () => {
    render(<App />);
    const button = screen.getAllByRole('button')[0];
    Object.defineProperty(document.documentElement, 'offsetWidth', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(button, 'offsetLeft', {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(button, 'offsetTop', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(button, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(button, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    const menu = document.querySelector('ul[role="menu"]');
    if (menu) {
      Object.defineProperty(menu, 'offsetHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(menu, 'offsetWidth', {
        configurable: true,
        value: menuWidth,
      });
    }

    fireEvent.click(button);

    const dropdownMenu = screen.getByRole('menu');
    expect(dropdownMenu.style.left).toBe('590px');
    expect(dropdownMenu.style.top).toBe('250px');
  });

  test('open menu in the right-top direction based on button position', () => {
    render(<App />);
    const button = screen.getAllByRole('button')[0];
    Object.defineProperty(document.documentElement, 'offsetWidth', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(button, 'offsetLeft', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(button, 'offsetTop', {
      configurable: true,
      value: 920,
    });
    Object.defineProperty(button, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(button, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    const menu = document.querySelector('ul[role="menu"]');
    if (menu) {
      Object.defineProperty(menu, 'offsetHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(menu, 'offsetWidth', {
        configurable: true,
        value: menuWidth,
      });
    }

    fireEvent.click(button);

    const dropdownMenu = screen.getByRole('menu');
    expect(dropdownMenu.style.left).toBe('200px');
    expect(dropdownMenu.style.top).toBe('820px');
  });

  test('open menu in the left-top direction based on button position', () => {
    render(<App />);
    const button = screen.getAllByRole('button')[0];
    Object.defineProperty(document.documentElement, 'offsetWidth', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(button, 'offsetLeft', {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(button, 'offsetTop', {
      configurable: true,
      value: 900,
    });
    Object.defineProperty(button, 'offsetWidth', {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(button, 'offsetHeight', {
      configurable: true,
      value: 50,
    });
    const menu = document.querySelector('ul[role="menu"]');
    if (menu) {
      Object.defineProperty(menu, 'offsetHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(menu, 'offsetWidth', {
        configurable: true,
        value: menuWidth,
      });
    }

    fireEvent.click(button);

    const dropdownMenu = screen.getByRole('menu');
    expect(dropdownMenu.style.left).toBe('590px');
    expect(dropdownMenu.style.top).toBe('800px');
  });
});
