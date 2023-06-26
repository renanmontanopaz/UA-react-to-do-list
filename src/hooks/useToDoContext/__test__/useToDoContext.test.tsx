import {describe, it, expect} from "vitest";
import {ToDoContextProvider} from "../../../contexts/ToDo";
import {renderHook} from "@testing-library/react";
import useToDoContext from "../index.tsx";

describe('<UseToDoContext>', () => {
  it("Deve renderizar o context dentro do ToDoContextProvider", () => {
    const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
      <ToDoContextProvider>{children}</ToDoContextProvider>
    );
    const { result } = renderHook(() => useToDoContext(), { wrapper });
    expect(result.current).toBeDefined();
  });
})