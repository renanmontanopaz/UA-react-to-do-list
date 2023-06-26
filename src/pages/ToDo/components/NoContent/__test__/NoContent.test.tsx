import {describe, it, expect} from "vitest";
import {NoContent} from "../index.tsx";
import {render, screen} from "@testing-library/react";

describe('<NoContent>', () => {
  it('Deve renderizar corretamente o componente', () => {
    render(<NoContent />);

    const imageElement = screen.getByAltText('ícone de clipboard');
    const textElement = screen.getByText('Você ainda não tem tarefas cadastradas');

    expect(imageElement).toBeTruthy();
    expect(textElement).toBeTruthy();
  });
})