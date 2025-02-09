/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296")

  // update collection data
  unmarshal({
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        date(created) AS workout_date,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n  user,\n    workout_date,\n    exercise,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n    workout_date,\n    exercise\nORDER BY\n    detailed.created "
  }, collection)

  // remove field
  collection.fields.removeById("_clone_nNze")

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

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_rG2b",
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
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        date(created) AS workout_date,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n    workout_date,\n    exercise,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n    workout_date,\n    exercise\nORDER BY\n    detailed.created "
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "_clone_nNze",
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
  collection.fields.removeById("json2375276105")

  // remove field
  collection.fields.removeById("_clone_rG2b")

  return app.save(collection)
})
