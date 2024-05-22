import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "../app/page";

vi.mock("@clerk/nextjs/server", () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC" })
      ),
    ClerkProvider: ({ children }: any) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrIRdJ194ndJqAHwEfxC",
        fullName: "Charles Harris",
      },
    }),
  };

  return mockedFunctions;
});

test(`Home`, async () => {
  render(await Page());

  expect(screen.getByText("My personal AI Journal app")).toBeTruthy();
  expect(
    screen.getByText("Track your mood based on what you write!")
  ).toBeTruthy();
  expect(screen.getByText("Get Started")).toBeTruthy();
});
