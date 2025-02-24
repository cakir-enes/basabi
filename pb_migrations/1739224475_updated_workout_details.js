/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296")

  // update collection data
  unmarshal({
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        date(created) AS workout_date,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n  user,\n    workout_date,\n    exercises.name as exercise,\n  exercises.id as exercise_id,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps, 'id', detailed.id)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n  user,\n    workout_date,\n    exercise\nORDER BY\n    user, detailed.created "
  }, collection)

  // remove field
  collection.fields.removeById("_clone_H2k9")

  // remove field
  collection.fields.removeById("_clone_VzAg")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_gK0w",
    "max": 0,
    "min": 0,
    "name": "exercise",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1804250889",
    "hidden": false,
    "id": "relation3912537370",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "exercise_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "_clone_QONz",
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
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        date(created) AS workout_date,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n  user,\n    workout_date,\n    exercises.name as exercise,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps, 'id', detailed.id)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n  user,\n    workout_date,\n    exercise\nORDER BY\n    user, detailed.created "
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_H2k9",
    "max": 0,
    "min": 0,
    "name": "exercise",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_VzAg",
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
  collection.fields.removeById("_clone_gK0w")

  // remove field
  collection.fields.removeById("relation3912537370")

  // remove field
  collection.fields.removeById("_clone_QONz")

  return app.save(collection)
})
