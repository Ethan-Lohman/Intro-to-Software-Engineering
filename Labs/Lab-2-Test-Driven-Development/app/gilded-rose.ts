export class Item {
  name : string;
  sellIn : number;
  quality : number;

  constructor(name : string, sellIn : number, quality : number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert' 
const SULFURAS ='Sulfuras, Hand of Ragnaros' 
const BRIE = 'Aged Brie' 
const CONJURED = 'Conjured'

function backStage(item : any) {
  item.sellIn = item.sellIn - 1;
  if (item.quality > 0) {
    if (item.sellIn >= 10) {
      item.quality = item.quality + 1
    } else if (item.sellIn < 10 && item.sellIn > 5) {
      item.quality = item.quality + 2
    } else if (item.sellIn <= 5 && item.sellIn > 0) {
      item.quality = item.quality + 3
    } else {
      item.quality = 0
    }
  }
}

function Brie(item : any) {
  item.sellIn = item.sellIn - 1;
  if (item.quality < 50) {
    item.quality = item.quality + 1
  }
}

function Conjured(item : any) {
  item.sellIn = item.sellIn - 1;
  if (item.sellIn > 0 && item.quality > 0) {
    item.quality = item.quality - 2
  } else if (item.quality > 0) {
    item.quality = item.quality - 4
  }
}

function Default(item : any) {
  // Subtracts the sellIn by one
  item.sellIn = item.sellIn - 1;
  if (item.sellIn <= 0) {
    item.quality = item.quality - 2
  } else if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
}

export class GildedRose {
  items : Array<Item>;

  constructor(items = [] as Array<Item>) { this.items = items; }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i]

      if (!(item.name == BACKSTAGE || item.name == SULFURAS || item.name == BRIE || item.name == CONJURED)) {
        Default(item)
      }
      else {
        if (item.name == BACKSTAGE) {
          backStage(item)
        } else if (item.name == BRIE) {
          Brie(item)
        } else if (item.name == CONJURED) {
          Conjured(item)
        }
      }
    }
    return this.items;
  }
}
