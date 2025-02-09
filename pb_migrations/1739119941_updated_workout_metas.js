/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1947662962")

  // update collection data
  unmarshal({
    "viewQuery": "WITH metas AS (\n    SELECT\n  user,\n        workout_date,\n        target,  -- Keep the raw target field\n        sum(vol) AS vol,\n        sum(duration_sec) AS duration_sec\n    FROM\n        workout_details\n    GROUP BY\n  user,\n        workout_date,\n        target\n)\nSELECT\n    (ROW_NUMBER() OVER()) as id,\n  user,\n    workout_date,\n    target as title,\n    vol,\n    duration_sec\nFROM\n    metas\nORDER BY\n    user, workout_date DESC"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json2375276105",
    "maxSize": 1,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1947662962")

  // update collection data
  unmarshal({
    "viewQuery": "WITH metas AS (\n    SELECT\n        workout_date,\n        target,  -- Keep the raw target field\n        sum(vol) AS vol,\n        sum(duration_sec) AS duration_sec\n    FROM\n        workout_details\n    GROUP BY\n        workout_date,\n        target\n)\nSELECT\n    (ROW_NUMBER() OVER()) as id,\n    workout_date,\n    target as title,\n    vol,\n    duration_sec\nFROM\n    metas\nORDER BY\n    workout_date DESC"
  }, collection)

  // remove field
  collection.fields.removeById("json2375276105")

  return app.save(collection)
})
