import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupModal from "../SignupModal";

describe("Signup Modal", () => {
  it("renders", () => {
    render(<SignupModal>test</SignupModal>);
  });
  
  it("renders its children", () => {
    render(<SignupModal>test</SignupModal>);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

});
