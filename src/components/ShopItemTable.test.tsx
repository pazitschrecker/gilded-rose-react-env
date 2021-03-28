import React from "react";
import { shallow } from "enzyme";
import ShopItemTable from "./ShopItemTable";

describe("ShopItemTable Tests", () => {
  it("renders a table with one item (1 row)", () => {
    const items = [
      {
        name: "Conjured Item",
        sellIn: 4,
        quality: 5,
      },
    ];
    const subject = shallow(<ShopItemTable items={items} />);
    let itemRow = subject.find(".item-row");
    expect(itemRow.length).toBe(1);
  });

  it("renders a table with three items (3 rows)", () => {
    const items = [
      {
        name: "Sour Patch Kids",
        sellIn: 4,
        quality: 5,
      },
      {
        name: "Skittles",
        sellIn: 8,
        quality: 2,
      },
      {
        name: "M&Ms",
        sellIn: 2,
        quality: 1,
      },
    ];
    const subject = shallow(<ShopItemTable items={items} />);
    let itemRows = subject.find(".item-row");
    expect(itemRows.length).toBe(3);
  });
});
