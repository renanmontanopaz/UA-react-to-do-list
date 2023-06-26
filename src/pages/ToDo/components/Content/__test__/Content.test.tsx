import {beforeAll, describe, it, expect} from "vitest";
import { render, screen} from "@testing-library/react";
import {Content} from "../index.tsx";

describe('<Content>', () => {
  beforeAll(() => {
    render(<Content />);
  })
  it("Deve renderizar o botão do componente", () => {
    const button = screen.getByTestId("button-name");
    expect(button).not.toBeNull();
  });
  it("Deve renderizar o content corretamente", () => {
    const content = screen.getByTestId("content-name");
    expect(content).not.toBeNull();
  });

  it("Deve renderizar o input corretamente", () => {
    const input = screen.getByTestId("input-name");
    expect(input).not.toBeNull();
  });
})