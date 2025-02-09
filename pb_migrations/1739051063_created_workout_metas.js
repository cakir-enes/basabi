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
        "id": "json724990059",
        "maxSize": 1,
        "name": "title",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
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
        "id": "json2251041769",
        "maxSize": 1,
        "name": "duration_sec",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_1947662962",
    "indexes": [],
    "listRule": null,
    "name": "workout_metas",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "WITH metas AS (\n    SELECT\n        workout_date,\n        target,  -- Keep the raw target field\n        sum(vol) AS vol,\n        sum(duration_sec) AS duration_sec\n    FROM\n        workout_details\n    GROUP BY\n        workout_date,\n        target\n)\nSELECT\n    (ROW_NUMBER() OVER()) as id,\n    workout_date,\n    target as title,\n    vol,\n    duration_sec\nFROM\n    metas\nORDER BY\n    workout_date DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1947662962");

  return app.delete(collection);
})
