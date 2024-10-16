import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from '@/containers/Home/Home.page';

vi.mock('@/containers/Home/components', () => ({
    MoviesByYearComponent: () => <div>MoviesByYearComponent</div>,
    MultipleWinnersComponent: () => <div>MultipleWinnersComponent</div>,
    StudiosWithWinCountComponent: () => <div>StudiosWithWinCountComponent</div>,
    WinByIntervals: () => <div>WinByIntervals</div>,
}));

vi.mock('@/components/pages', () => ({
    PageWithBreadcrumb: ({ children }) => <div>{children}</div>,
}));

vi.mock('@/components/ui', () => ({
    Grid: ({ children }) => <div>{children}</div>,
}));

describe('HomePage', () => {
    it('should render all components inside HomePage', () => {
        render(<HomePage />);

        expect(screen.getByText('MoviesByYearComponent')).toBeInTheDocument();
        expect(screen.getByText('MultipleWinnersComponent')).toBeInTheDocument();
        expect(screen.getByText('StudiosWithWinCountComponent')).toBeInTheDocument();
        expect(screen.getByText('WinByIntervals')).toBeInTheDocument();
    });
});
