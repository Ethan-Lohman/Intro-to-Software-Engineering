import {IStore, IShelf, IInventoriedItems} from './InventoryClasses'

// random test data for InventoryClasses

export const storeData: IStore[]= [
    {
      id: "",
      address: "3250 N Shelby St.",
      phone: "317-788-3333",
    },
    {
      id:"",
      address: "1400 E Hanna St.",
      phone: "317-788-4444",
    }
  ]

export const shelfData: IShelf[] = [
    {
        id:'',
        storeId:'',
        location:'East Wall',
        tag:'History',
    },
    {
        id:'',
        storeId:'',
        location:'Middle Aisle',
        tag:'Philosophy',
    }
]

export const inventoryData: IInventoriedItems[] = [
    {
        id:'',
        shelfId:'',
        title: 'Before the Civil War',
        quantity: 3,
        description:'popular history book',
        price: 3.5
    },
    {
        id:'',
        shelfId:'',
        title: 'After the Civil War',
        quantity: 3,
        description:'not so popular history book',
        price: 2.9
    },
]