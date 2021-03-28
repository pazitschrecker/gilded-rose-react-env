// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GildedRose from "./GildedRose";

configure({ adapter: new Adapter() });

describe("GildedRose Render Tests", () => {
  it("renders the on sale section header at start", () => {
    const { getAllByRole } = render(<GildedRose />);
    const discountHeader = getAllByRole("tab")[0];
    expect(discountHeader).toHaveTextContent(/On Sale | 5$/i);
  });

  it("renders the discount section header at start", () => {
    const { getAllByRole } = render(<GildedRose />);
    const discountHeader = getAllByRole("tab")[1];
    expect(discountHeader).toHaveTextContent(/Discount | 0$/i);
  });

  it("renders two <ShopItemTable/> components", () => {
    const gildedRose = shallow(<GildedRose />);
    const tabSection = gildedRose.find("ShopItemTable");
    expect(tabSection.length).toBe(2);
  });

  it("renders title of page", () => {
    const { getByRole } = render(<GildedRose />);
    const header = getByRole("link");
    expect(header).toHaveTextContent(/the gilded rose$/i);
  });
});
