![InventoryManager - Class Diagram](https://www.planttext.com/api/plantuml/png/RP71JiCm38RlVWeVEy5UeAT9J9DwG3qmSUBYDMu9f0vAt6aJyEwawJeXjPTKhh_ljvNiebBGeNS0yTCA1XyPGAqwnahEBEh3zPc4EWwunIT7CUBUKXUenpS1cFuSwzF7J7q3uhQQPSkcKkuZ_08qcLt4yaLPp3BaeV4IDGnDWWly6axEDXZVsRKtgdpvLsnWLCYOWeubBkRVssErZZmYvS3Kojz9wLXpTV0XgpOTbIdJObQw3Sum_k0WXbihREvU2kTrRzJ6xa9Jh-HUoGrSjtchMd9-iRPRuDwVUSGEmVSJb-ViIxmDIlU-IxURNlWF)

![Finding a StoreID - Activity Diagram](https://www.planttext.com/api/plantuml/png/HO-n3eCm34HtVuN7TkWFb0KaHCLQrYufCM2L99NZ8l7tJQYWuxsxiyvbL2FwSJD0VB572P40b7KcRDXRzYCQZ1g4sXelMFNA2-kADPjHZCE7Jyry0-1QMRk7Yx-SQ1uEwP6LN9OT6Uad78By6lXSDw-jitiZHPq8kzm-K9U3ZGItuTCvuplrJ0lj6ukq9hm1Il8slVK5)
--------
Text Editions:

// Class Diagram

@startuml

skin rose

title InventoryManager - Class Diagram \n

Class TObjManager {
  -IInventoriedItems
}

class InventoryManager extends TObjManager {
  +constructor( public shelfManager:ShelfManager)

  +add(aT: IInventoriedItems)

  +addItem(aT: IInventoriedItems, aShelf: IShelf)

  +getShelfForItem(itemId:string) : IShelf | undefined

  +getStoreForItem(itemId:string): IStore | undefined

  +totalValueOfItemsOnShelf(aShelf: IShelf)

  +removeItemFromShelf(itemID: string)
}
@enduml

-----------------------

// Activity Diagram

@startuml

skin rose

title Finding a storeID - Activity Diagram \n

start

:Add a store;

:Add a shelf;

:Add an item;

:Search for store by itemID;

:Get the ShelfID;

:GetStoreFromShelf();

:Recieve storeID;
stop

@enduml