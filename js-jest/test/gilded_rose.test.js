/*
- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item
  - Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

  We have recently signed a supplier of conjured items. This requires an update to our system:
  - "Conjured" items degrade in Quality twice as fast as normal items
*/

const {Shop, Item} = require("../src/gilded_rose");

describe("Item", function() {
  // it("should foo", function() {
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe("fixme");
  // });

  it("should initialize correctly ", function() {
    const item = new Item("foo", 5, 10);
    expect(item.name).toBe("foo");
    expect(item.sellIn).toBe(5);
    expect(item.quality).toBe(10);
  });
});

describe("Shop", function() {
  it("should initialize correctly", function() {
    const initialItems = [new Item("foo", 5, 10)];
    const items = initialItems.slice(0);
    const gildedRose = new Shop(items);
    expect(gildedRose.items).toBe(items);
    expect(gildedRose.items).toEqual(initialItems);

    const gildedRose2 = new Shop();
    expect(gildedRose2.items).toEqual([]);
  });

  it("should decrease standard item quality and sellIn by one when updated", function() {
    const gildedRose = new Shop([
      new Item("foo", 5, 10),
      new Item("foo2", 3, 20)]
    );
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
    expect(items[1].quality).toBe(19);
    expect(items[0].sellIn).toBe(4);
    expect(items[1].sellIn).toBe(2);
  })

  it("should decrease quality twice as fast when sellIn at 0", function() {
    const gildedRose = new Shop([
      new Item("foo", 0, 12)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(-1);
  })

  it("should never decrease quality under zero", function() {
    const gildedRose = new Shop([
      new Item("foo", 5, 0),
      new Item("foo2", 0, 0)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  })


  it("should have Aged Brie augmenting quality with time", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 5, 46),
      new Item("Aged Brie", -1, 46)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(47);
    expect(items[1].quality).toBe(48);

  })

  it("should never have an item with quality over 50", function() {
    const gildedRose = new Shop([
      new Item("Aged Brie", 5, 50)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  it("should never change values of Sulfuras, Hand of Ragnaros", function() {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 5, 8)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(8);
  })

  it("should augment backstage pass when concert is approaching", function() {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 8),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 8),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 8),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 8)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
    expect(items[1].quality).toBe(10);
    expect(items[2].quality).toBe(11);
    expect(items[3].quality).toBe(0);
  })











});




