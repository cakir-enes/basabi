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
        "id": "json130897217",
        "maxSize": 1,
        "name": "weight",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "json1214113712",
        "maxSize": 1,
        "name": "reps",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
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
      }
    ],
    "id": "pbc_450975559",
    "indexes": [],
    "listRule": null,
    "name": "prs",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT (row_number() over()) as id, exercise, weight, reps, date(created) as workout_date\nFROM (\n    SELECT *,\n        RANK() OVER (PARTITION BY exercise ORDER BY weight DESC) as rnk\n    FROM SETS\n) s\nWHERE rnk = 1",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_450975559");

  return app.delete(collection);
})
