import { screen, render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import ToDo from "..";
import { BrowserRouter } from "react-router-dom";

describe("<Todo />", () => {
  beforeAll(() => {
    render(<ToDo />, { wrapper: BrowserRouter })
  })
  it("Deve renderizar o header corretamente", () => {
    const header = screen.getByTestId("header");
    expect(header).not.toBeNull();
  })

  it("Deve renderizar o content corretamente", () => {
    const content = screen.getByTestId("content");
    expect(content).not.toBeNull();
  })
})