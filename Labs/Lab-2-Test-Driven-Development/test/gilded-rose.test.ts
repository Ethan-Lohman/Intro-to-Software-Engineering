import { Item, GildedRose } from '../app/gilded-rose';

describe('Check Elixir of Mongoose', () => {
  it('should decrease SellIn and Quality of Elixir of Mongoose by one', () => {
    const items = [
      new Item("Elixir of the Mongoose", 5, 7) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(6)
    expect(updatedItems[0].sellIn).toBe(4)
  })

})

describe('Check Elixir of Goose', () => {
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const items = [
      new Item("Elixir of the goose", 0, 7) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(5)
    expect(updatedItems[0].sellIn).toBe(-1)
  })

})

describe('Check Elixir of Rabbit', () => {
  it('The Quality of an item is never negative', () => {
    const items = [
      new Item("Elixir of the Rabbit", 5, 0) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(0)
    expect(updatedItems[0].sellIn).toBe(4)
  })

})

describe('Aged Brie', () => {
  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const items = [
      new Item("Aged Brie", 5, 5) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(6)
    expect(updatedItems[0].sellIn).toBe(4)
  })

})

//The Quality of an item is never more than 50
describe('Nevermore Exilir', () => {
  it('"Aged Brie" never reaches above 50', () => {
    const items = [
      new Item("Aged Brie", 5, 50) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(50)
    expect(updatedItems[0].sellIn).toBe(4)
  })

})

describe('Check Sulfuras', () => {
  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const items = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(80)
    expect(updatedItems[0].sellIn).toBe(0)
  })

})

// check that quality increases by 2 when sellin is 10 or less
describe('Backstage passes', () => {
  it('Backstage passes, like aged brie, increases in Quality as its SellIn value approaches', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 5) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(7)
    expect(updatedItems[0].sellIn).toBe(8)
  })

})

// check that quality increases by 3 when sellin is 5 or less
describe('Backstage passes', () => {
  it('Backstage passes, like aged brie, increases in Quality as its SellIn value approaches', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 5) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(8)
    expect(updatedItems[0].sellIn).toBe(2)
  })

})

// Quality drops to 0 after the concert
describe('Check Backstage passes', () => {
  it('"Backstage passes", quality drops to 0 after the concert.', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(0)
    expect(updatedItems[0].sellIn).toBe(-1)
  })

})

// - "Conjured" items degrade in Quality twice as fast as normal items
describe('Check Conjured Items', () => {
  it('"Conjured", quality drops twice as fast.', () => {
    const items = [
      new Item("Conjured", 5, 10) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(8)
    expect(updatedItems[0].sellIn).toBe(4)
  })

})

// - "Conjured" items degrade in Quality four times as fast as normal items after zero
describe('Check Conjured Items', () => {
  it('"Conjured", quality drops four times as fast.', () => {
    const items = [
      new Item("Conjured", 0, 10) // name, sellIn, quality
    ] 
    
    const gildedRose = new GildedRose(items);

    const updatedItems = gildedRose.updateQuality()

    expect(updatedItems[0].quality).toBe(6)
    expect(updatedItems[0].sellIn).toBe(-1)
  })

})