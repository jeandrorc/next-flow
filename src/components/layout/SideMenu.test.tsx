import React from 'react';
import {render, screen } from '@testing-library/react';
import { SideMenu } from './SideMenu';
import userEvent from '@testing-library/user-event';
import { vi, Mock } from 'vitest';

import { usePathname } from 'next/navigation';

import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
    usePathname: vi.fn(),
}));

vi.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    ),
}));

vi.mock('@/components/ui', () => ({
    Button: ({ children, onClick, ...props }: any) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    ),
}));

describe('SideMenu component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (usePathname as Mock).mockReturnValue('/');
    });

    test('deve renderizar o botão de menu', () => {
        render(<SideMenu />);
        const menuToggle = screen.getByTestId('menu-toggle');
        expect(menuToggle).toBeInTheDocument();
    });

    test('deve abrir o drawer ao clicar no botão de menu', async () => {
        render(<SideMenu />);
        const menuToggle = screen.getByTestId('menu-toggle');
        await userEvent.click(menuToggle);

        const drawer = await screen.findByTestId('drawer');
        expect(drawer).toBeInTheDocument();
    });

    test('deve fechar o drawer ao clicar novamente no botão de menu', async () => {
        render(<SideMenu />);
        const menuToggle = screen.getByTestId('menu-toggle');
        await userEvent.click(menuToggle);

        const drawer = await screen.findByTestId('drawer');
        expect(drawer).toBeInTheDocument();
        expect(drawer).toBeVisible();

        await userEvent.click(menuToggle);

        expect(drawer).not.toBeVisible();
    });

    test('deve renderizar os itens do menu', () => {
        render(<SideMenu />);
        const menuItems = screen.getAllByRole('link');
        expect(menuItems.length).toBeGreaterThan(0);
    });

    test('deve fechar o drawer ao clicar em um item do menu', async () => {
        render(<SideMenu />);
        const menuToggle = screen.getByTestId('menu-toggle');
        await userEvent.click(menuToggle);

        const menuItem = screen.getByTestId('menu-drawer-item-home-menu');
        await userEvent.click(menuItem);

        expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

});
