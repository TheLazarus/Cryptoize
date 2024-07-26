import { describe } from "node:test";
import { screen, render } from "@testing-library/react";
import CryptoDetails from "../CryptoDetails";
import { useRouter } from "next/navigation";

jest.mock("../CryptoTable", () => ({
  __esModule: true,
  default: () => <h1>CryptoTable</h1>,
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Unit tests on the Crypto Details Component", () => {
  it("Should render the component successfully", async () => {
    render(<CryptoDetails />);
  });
  it("Should render the CryptoTable component", async () => {
    render(<CryptoDetails />);
    const cryptoTableComponent = await screen.findByText(/crypto table/i);
    expect(cryptoTableComponent).toBeInTheDocument();
  });
});
