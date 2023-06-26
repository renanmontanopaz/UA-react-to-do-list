import {beforeAll, describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Toast} from "../index.tsx";

describe("<Toast>", () => {

  beforeAll(() => {
    const message = 'renderizou';
    const type = 'success';
    render(<Toast message={message} type={type}/>, {
      wrapper: BrowserRouter
    });
  })

  it('deve atribuir o className na tag p', () => {

    const toastMessage = screen.getByText('renderizou');
    expect(toastMessage.classList.contains('success')).toBe(false);
  });

  it('Deve renderizar toast com message = "Renderizou"', () => {
    const message = 'Renderizou';
    const type = 'success';

    render(<Toast message={message} type={type} />);

    const toast = screen
      .findByText(/Renderizou/i);

    expect(toast).not.toBeNull();
  });

  it('Deve renderizar toast com o type = "success"', () => {

    const message = 'Renderizou';
    const type = 'success';

    render(<Toast message={message} type={type} />);

    const toast = screen
      .findByText(/success/i);

    expect(toast).not.toBeNull();
  });
})