/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296")

  // update collection data
  unmarshal({
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n  user,\n\n  date(workout_date) AS workout_date,\n    exercises.name as exercise,\n  exercises.id as exercise_id,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps, 'id', detailed.id)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n    user,\n    workout_date,\n    exercise\nORDER BY\n    user, detailed.created "
  }, collection)

  // remove field
  collection.fields.removeById("json107728731")

  // remove field
  collection.fields.removeById("_clone_XSG3")

  // remove field
  collection.fields.removeById("_clone_ewIJ")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_HNVS",
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
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "_clone_Nn8B",
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
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        SUBSTR(workout_date, 10) AS workout_datee,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n  user,\n    workout_date,\n  date(workout_date) AS workout_datee,\n    exercises.name as exercise,\n  exercises.id as exercise_id,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps, 'id', detailed.id)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.id\nGROUP BY\n    user,\n    workout_date,\n    exercise\nORDER BY\n    user, detailed.created "
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json107728731",
    "maxSize": 1,
    "name": "workout_datee",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_XSG3",
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
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "_clone_ewIJ",
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
  collection.fields.removeById("_clone_HNVS")

  // remove field
  collection.fields.removeById("_clone_Nn8B")

  return app.save(collection)
})
