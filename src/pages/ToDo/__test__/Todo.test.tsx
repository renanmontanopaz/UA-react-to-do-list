import {beforeAll, describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import ToDo from "../index.tsx";
import {BrowserRouter} from "react-router-dom";

describe("<Todo />", () =>{
  beforeAll(() =>{
    const {debug} = render(<ToDo />, {wrapper: BrowserRouter})
    debug()
  })
  
  it("Deve redenrizar header de forma correta", () => {
    const header = screen.getByTestId("header");
    expect(header).not.toBeNull();
  })

  it("Deve redenrizar content de forma correta", () => {
    const content = screen.getByTestId("content");
    expect(content).not.toBeNull();
  })
})