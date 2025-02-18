// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GildedRose from "./GildedRose";

configure({ adapter: new Adapter() });

describe("GildedRose Basic Render Tests", () => {
  it("renders the on sale section header at start", () => {
    const { getAllByRole } = render(<GildedRose />);
    const discountHeader = getAllByRole("tab")[0];
    expect(discountHeader).toHaveTextContent("On Sale");
  });

  it("renders the discount section header at start", () => {
    const { getAllByRole } = render(<GildedRose />);
    const discountHeader = getAllByRole("tab")[1];
    expect(discountHeader).toHaveTextContent("Discount");
  });

  it("renders two <ShopItemTable/> components", () => {
    const wrapper = shallow(<GildedRose />);
    const tabSection = wrapper.find("ShopItemTable");
    expect(tabSection.length).toBe(2);
  });

  it("renders title of page", () => {
    const { getByRole } = render(<GildedRose />);
    const header = getByRole("link");
    expect(header).toHaveTextContent(/the gilded rose$/i);
  });

  it("renders number of discount items in header at start (0)", () => {
    const { getByTestId } = render(<GildedRose />);
    const discountCount = getByTestId("discount-header");
    expect(discountCount).toHaveTextContent("0");
  });

  it("renders number of on sale items in header at start (5)", () => {
    const { getByTestId } = render(<GildedRose />);
    const onSaleCount = getByTestId("sale-header");
    expect(onSaleCount).toHaveTextContent("5");
  });

  it("renders update quality button", () => {
    const { getByTestId } = render(<GildedRose />);
    const updateButton = getByTestId("update-button");
    expect(updateButton).toHaveTextContent("Update Quality");
  });
});
