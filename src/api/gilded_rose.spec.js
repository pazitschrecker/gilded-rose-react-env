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
  it("should not let Conjured item quality fall below 0", () => {
    const gildedRose = new Shop([new Item("Conjured Item", 9, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});

describe("Discount Item Tests -- Gilded Rose", function () {
  let gildedRose;
  beforeEach(() => {
    gildedRose = new Shop([
      new Item("Cinnamon Toast Crunch", 1, 6),
      new Item("Froot Loops", 9, 6),
      new Item("Fruity Pebbles", 5, 2),
    ]);
  });
  it("should add items to discount once Quality reaches 0", function () {
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[0].name).toEqual("Cinnamon Toast Crunch");
  });
  it("should add item to Discount once SellIn date passes", function () {
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[1].name).toEqual("Fruity Pebbles");
  });
  it("should decrease quality of discounted item twice as fast", function () {
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const discountItems = gildedRose.getDiscounted();
    expect(discountItems[0].quality).toEqual(3);
  });
});

describe("OnSale Item Tests -- Gilded Rose", function () {
  let gildedRose;
  beforeEach(() => {
    gildedRose = new Shop([
      new Item("ESP32", 8, 6),
      new Item("Raspberry Pi", 12, 2),
      new Item("LED", 3, 4),
    ]);
  });
  it("should keep items in onSale if quality > 0 and SellIn date not passed", function () {
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const onSaleItems = gildedRose.getOnSale();
    expect(onSaleItems.length).toEqual(3);
  });
  it("should remove item from onSale once SellIn date passes", function () {
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateItemLists();
    const onSaleItems = gildedRose.getOnSale();
    expect(onSaleItems.length).toEqual(2);
  });
});

describe("Sulfuras Item Tests -- Gilded Rose", function () {
  let gildedRose;
  beforeEach(() => {
    gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1000, 80)]);
  });
  it("should not reduce the quality of Sulfuras item", function () {
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });
  it("should not change SellIn date of Sulfuras item", function () {
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(1000);
  });
});

describe("Backstage Passes Item Tests -- Gilded Rose", function () {
  it("should increase the quality of Backstage pass item by 1", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 8),
    ]);
    const items = gildedRose.updateQuality();
    console.log(items[0]);
    expect(items[0].quality).toEqual(9);
  });
  it("should increase the quality of Backstage pass item by 2", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 8),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(10);
  });
  it("should increase the quality of Backstage pass item by 3", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 8),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
  });
  it("should drop the quality of Backstage pass item to 0", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 8),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should not let quality of Backstage pass item go below 0", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});

describe("Aged Brie Item Tests -- Gilded Rose", function () {
  it("should increase quality of Brie by 1 before SellIn", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 3, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(5);
  });
  it("should increase quality of Brie by 2 after SellIn", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(7);
  });
  it("should not increase quality of Brie beyond 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 6, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  describe("Boring Item Tests -- Gilded Rose", () => {
    it("should not drop quality below 0", function () {
      const gildedRose = new Shop([new Item("Boring Item", 6, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
    it("should decrease quality by 1 each day while On Sale", function () {
      const gildedRose = new Shop([new Item("Boring Item", 6, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(7);
    });
  });
});
