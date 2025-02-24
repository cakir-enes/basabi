/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_450975559")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT (row_number() over()) as id, user, exercise, weight, reps, date(workout_date) as workout_date\nFROM (\n    SELECT *,\n        RANK() OVER (PARTITION BY user, exercise ORDER BY weight DESC) as rnk\n    FROM SETS\n) s\nWHERE rnk = 1"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_450975559")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT (row_number() over()) as id, user, exercise, weight, reps, date(created) as workout_date\nFROM (\n    SELECT *,\n        RANK() OVER (PARTITION BY user, exercise ORDER BY weight DESC) as rnk\n    FROM SETS\n) s\nWHERE rnk = 1"
  }, collection)

  return app.save(collection)
})
