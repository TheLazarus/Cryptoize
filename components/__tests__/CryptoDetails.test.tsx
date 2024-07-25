import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import FullPageLoader from "../FullPageLoader";

jest.mock("lucide-react", () => ({
  ...jest.requireActual("lucide-react"),
  BitcoinIcon: () => {
    return <h1>Bitcoin Icon</h1>;
  },
}));

describe("Unit tests on the Crypto Details Component", () => {
  it("Should render the component successfully", async () => {
    render(<FullPageLoader />);
    const bitcoinIcon = await screen.findByText(/bitcoin icon/i);
    expect(bitcoinIcon).toBeInTheDocument();
  });
});
