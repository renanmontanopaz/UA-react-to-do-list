import {beforeAll, describe, expect, it} from 'vitest';

import { render, screen } from '@testing-library/react';
import LandingPage from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<LandingPage>', () => {
  
  beforeAll(() =>{
    const {debug} = render(<LandingPage/>, {
      wrapper: BrowserRouter
    })
    debug()
    }
  )
  it('Deve conter um título na tag h1 "To Do List"', async () =>{
    const h1 = await screen.queryByText("To do List");
    expect(h1).not.toBeNull();
  })

  it('O link da imagem deve direcionar para a rota "/to-do"', async () =>{
    const link = screen.getByRole("link", {name: /Capa do sistema/i})
    expect(link.getAttribute("href")).toBe("/to-do")
  })
}) 