import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import LandingPage from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<LandingPage>', () => {
  it('Deve renderizar a landing page corretamente', async () => {
    const { debug } = render(<LandingPage />, {
      wrapper: BrowserRouter
    });

    debug();

    const h1 = await screen.queryByText("To do List");
    expect(h1).not.toBeNull();
  })
}) 