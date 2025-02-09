/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296")

  // update collection data
  unmarshal({
    "name": "workout_details"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_kSJ2")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_Bv2V",
    "maxSelect": 2,
    "name": "target",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "chest",
      "back",
      "arm",
      "biceps",
      "triceps",
      "delts",
      "legs"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296")

  // update collection data
  unmarshal({
    "name": "workout_metas"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_kSJ2",
    "maxSelect": 2,
    "name": "target",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "chest",
      "back",
      "arm",
      "biceps",
      "triceps",
      "delts",
      "legs"
    ]
  }))

  // remove field
  collection.fields.removeById("_clone_Bv2V")

  return app.save(collection)
})
