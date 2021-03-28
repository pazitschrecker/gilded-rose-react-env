import { Item, Shop } from "./gilded_rose";

describe("Conjured Items -- Gilded Rose", function () {
  it("should reduce quality of conjured item by 2", function () {
    const gildedRose = new Shop([new Item("Conjured Item", 4, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });
  it("should reduce quality of conjured item by 1 if too low", function () {
    const gildedRose = new Shop([new Item("Conjured Item", 4, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should reduce quality of item by 4 after sellIn", function () {
    const gildedRose = new Shop([new Item("Conjured Item", -2, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });
});
