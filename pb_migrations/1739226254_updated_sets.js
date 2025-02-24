/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3011519073")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date3685882489",
    "max": "",
    "min": "",
    "name": "cc",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3011519073")

  // remove field
  collection.fields.removeById("date3685882489")

  return app.save(collection)
})
