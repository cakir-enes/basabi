/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_450975559")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT (row_number() over()) as id, user, exercise, weight, reps, date(created) as workout_date\nFROM (\n    SELECT *,\n        RANK() OVER (PARTITION BY exercise ORDER BY weight DESC) as rnk\n    FROM SETS\n) s\nWHERE rnk = 1"
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
  const collection = app.findCollectionByNameOrId("pbc_450975559")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT (row_number() over()) as id, exercise, weight, reps, date(created) as workout_date\nFROM (\n    SELECT *,\n        RANK() OVER (PARTITION BY exercise ORDER BY weight DESC) as rnk\n    FROM SETS\n) s\nWHERE rnk = 1"
  }, collection)

  // remove field
  collection.fields.removeById("json2375276105")

  return app.save(collection)
})
