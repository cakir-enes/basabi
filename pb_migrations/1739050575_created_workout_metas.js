/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "json3524277254",
        "maxSize": 1,
        "name": "workout_date",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2933576988",
        "maxSize": 1,
        "name": "exercise",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "json157063147",
        "maxSize": 1,
        "name": "vol",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2990389176",
        "maxSize": 1,
        "name": "created",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2251041769",
        "maxSize": 1,
        "name": "duration_sec",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json2492286417",
        "maxSize": 1,
        "name": "sets",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_194766296",
    "indexes": [],
    "listRule": null,
    "name": "workout_metas",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "WITH detailed AS (\n    SELECT\n        *,\n        date(created) AS workout_date,\n        weight * reps AS vol,\n        ROUND((JULIANDAY(updated) - JULIANDAY(created)) * 24 * 60 * 60) AS duration_sec\n    FROM\n        SETS\n)\nSELECT\n   (ROW_NUMBER() OVER()) as id,\n    workout_date,\n    exercise,\n    exercises.target,\n    sum(vol) AS vol,\n    min(detailed.created) AS created,  \n    sum(duration_sec) AS duration_sec,\n    json_group_array(json_object('weight', weight, 'reps', reps)) AS sets\nFROM\n    detailed\n    JOIN exercises ON detailed.exercise = exercises.name\nGROUP BY\n    workout_date,\n    exercise\nORDER BY\n    detailed.created ",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_194766296");

  return app.delete(collection);
})
