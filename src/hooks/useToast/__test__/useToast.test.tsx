import {describe, it, expect} from "vitest";
import {ToastProvider} from "../../../contexts/Toast";
import {renderHook} from "@testing-library/react";
import {useToast} from "../index.tsx";

describe('<useToat>', () => {
  it("Deve renderizar o context dentro do ToastProvider", () => {
    const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current.showToast).toBeInstanceOf(Function);
  });
})