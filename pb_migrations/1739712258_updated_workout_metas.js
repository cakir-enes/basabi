/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1947662962")

  // update collection data
  unmarshal({
    "viewQuery": "WITH metas AS (\n    SELECT\n        user,\n        workout_date,\n        -- Extract first element from JSON array and remove duplicates\n        GROUP_CONCAT(DISTINCT \n            JSON_EXTRACT(target, '$[0]')\n        ) as targets,\n        SUM(vol) AS vol,\n        SUM(duration_sec) AS duration_sec\n    FROM\n        workout_details\n    GROUP BY\n        user,\n        workout_date\n)\nSELECT\n    (ROW_NUMBER() OVER()) as id,\n    user,\n    workout_date,\n    targets as title,\n    vol,\n    duration_sec\nFROM\n    metas\nORDER BY\n    user,\n    workout_date DESC;"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1947662962")

  // update collection data
  unmarshal({
    "viewQuery": "WITH metas AS (\n    SELECT\n        user,\n        workout_date,\n        GROUP_CONCAT(target) as targets,\n        SUM(vol) AS vol,\n        SUM(duration_sec) AS duration_sec\n    FROM\n        workout_details\n    GROUP BY\n        user,\n        workout_date\n)\nSELECT\n    (ROW_NUMBER() OVER()) as id,\n    user,\n    workout_date,\n    targets as title,\n    vol,\n    duration_sec\nFROM\n    metas\nORDER BY\n    user,\n    workout_date DESC;"
  }, collection)

  return app.save(collection)
})
