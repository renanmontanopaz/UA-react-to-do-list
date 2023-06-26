import {beforeAll, describe, expect, it} from "vitest";
import NotFound from "../index.tsx";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

describe('<NotFound>', () => {
  
  beforeAll(() => {
    render(<NotFound />, { wrapper: BrowserRouter })
  })
  
  it("Deve conter um titulo na tag h1", async()  => {
    const h1 = await screen.queryByText("Oops!");
    expect(h1).not.toBeNull();
  })

  it("Deve conter um texto na tag p", async()  => {
    const p = await screen.queryByText("Sorry, an unexpected error has occurred.");
    expect(p).not.toBeNull();
  })
  
})