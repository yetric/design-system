import { render, screen } from "@testing-library/react";
import { Stepper } from "./Stepper";

const steps = [
  { title: "Account", description: "Create your account" },
  { title: "Profile", description: "Set up your profile" },
  { title: "Review", description: "Review and submit" },
];

describe("Stepper", () => {
  it("renders all step titles", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("marks current step with aria-current=step", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const circles = screen.getAllByText(/\d/);
    // The step at index 1 should have aria-current
    const currentStep = document.querySelector('[aria-current="step"]');
    expect(currentStep).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });

  it("renders nav element", () => {
    const { container } = render(<Stepper steps={steps} activeStep={0} />);
    expect(container.querySelector("nav")).toBeInTheDocument();
  });
});
