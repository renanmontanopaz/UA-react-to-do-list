import {beforeAll, describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Header} from "..";

describe('<Header>', () => {
  beforeAll(() => {
    render(<Header />);
  })

  it("Deve renderizar o Header corretamente", async() => {
    const header = await screen.getByTestId("header");
    expect(header).not.toBeNull();
  });

  it('Deve renderizar a imagem da logo no header corretamente', async() => {
    const img = await screen.getByAltText("Logo principal do sistema");
    expect(img).not.toBeNull();
  })
})