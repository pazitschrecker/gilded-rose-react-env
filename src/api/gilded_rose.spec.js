import { Item, Shop } from "./gilded_rose";

describe("Conjured Item Tests -- Gilded Rose", function () {
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

describe("Discount Item Tests -- Gilded Rose", function () {
  it("should add item to Discount once SellIn date passes", function () {
    const gildedRose = new Shop([
      new Item("Rice Chex", 2, 16),
      new Item("Fruity Pebbles", 0, 8),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[0].name).toEqual("Fruity Pebbles");
  });
  it("should add items to discount once Quality reaches 0", function () {
    const gildedRose = new Shop([
      new Item("Froot Loops", 9, 0),
      new Item("Fruity Pebbles", 5, 3),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[0].name).toEqual("Froot Loops");
  });
  it("should maintain list of discounted items as more are added", function () {
    const gildedRose = new Shop([
      new Item("Cinnamon Toast Crunch", 0, 6),
      new Item("Froot Loops", 9, 6),
      new Item("Fruity Pebbles", 5, 2),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems.length).toEqual(2);
  });
  it("should decrease quality of discounted item twice as fast", function () {
    const gildedRose = new Shop([
      new Item("Rice Chex", 2, 16),
      new Item("Fruity Pebbles", 0, 8),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[0].quality).toEqual(6);
  });
});

describe("OnSale Item Tests -- Gilded Rose", function () {
  it("should keep items in onSale if quality > 0 and SellIn date not passed", function () {
    const gildedRose = new Shop([
      new Item("ESP32", 8, 6),
      new Item("Raspberry Pi", 9, 30),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const onSaleItems = gildedRose.getOnSale();
    expect(onSaleItems.length).toEqual(2);
  });
  it("should remove item from onSale once SellIn date passes", function () {
    const gildedRose = new Shop([
      new Item("ESP32", 1, 6),
      new Item("Raspberry Pi", 3, 18),
      new Item("LED", 3, 4),
    ]);
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const onSaleItems = gildedRose.getOnSale();
    expect(onSaleItems.length).toEqual(2);
  });
});
