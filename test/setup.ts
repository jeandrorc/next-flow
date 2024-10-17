import { server } from './server';
import '@testing-library/jest-dom';

// Iniciar o MSW antes dos testes
beforeAll(() => server.listen());

// Resetar os handlers entre os testes
afterEach(() => server.resetHandlers());

// Encerrar o MSW após todos os testes
afterAll(() => server.close());
