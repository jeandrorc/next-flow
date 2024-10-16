import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { useClickOutside } from '@/hooks/useClickOutside';

describe('useClickOutside', () => {
    it('should call handler when clicking outside of the element', () => {
        const handler = vi.fn();
        const ref = { current: document.createElement('div') };
        document.body.appendChild(ref.current);

        renderHook(() => useClickOutside(ref, handler));

        fireEvent.mouseDown(document.body);
        expect(handler).toHaveBeenCalled();
    });

    it('should not call handler when clicking inside the element', () => {
        const handler = vi.fn();
        const ref = { current: document.createElement('div') };
        document.body.appendChild(ref.current);

        renderHook(() => useClickOutside(ref, handler));

        fireEvent.mouseDown(ref.current);
        expect(handler).not.toHaveBeenCalled();
    });

    it('should not call handler if the ref is not assigned', () => {
        const handler = vi.fn();
        const ref = { current: null };

        renderHook(() => useClickOutside(ref, handler));

        fireEvent.mouseDown(document.body);
        expect(handler).not.toHaveBeenCalled();
    });
});
