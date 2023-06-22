import { beforeAll, describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import LandingPage from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<LandingPage>', () => {

  beforeAll(() => {
    render(<LandingPage />, {
      wrapper: BrowserRouter
    });
  })

  it('Deve conter um título na tag h1 "To do list"', async () => {
    const h1 = await screen.queryByText("To do List");
    expect(h1).not.toBeNull();
  })

  it('Deve renderizar a imagem de capa corretamente', () => {
    const img = screen.getByAltText("Capa do sistema");
    expect(img).not.toBeNull();
  })

  it('o link da imagemn deve direcionar para a rota de "/to-do"', () => {
    const link = screen.getByRole("link", { name: /Capa do sistema/i });
    expect(link.getAttribute("href")).toBe("/to-do");
  })
}) 