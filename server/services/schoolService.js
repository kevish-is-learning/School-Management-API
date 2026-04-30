const { pool } = require("../db/connection");

async function createSchool(schoolPayload) {
  const { name, address, latitude, longitude } = schoolPayload;

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.execute(query, [name, address, latitude, longitude]);

  return {
    id: result.insertId,
    name,
    address,
    latitude,
    longitude
  };
}

async function getSchoolsSortedByDistance({ latitude, longitude }) {
  const query = `
    SELECT
      id,
      name,
      address,
      latitude,
      longitude,
      ROUND(
        6371 * 2 * ASIN(
          SQRT(
            POWER(SIN(RADIANS(? - latitude) / 2), 2) +
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            POWER(SIN(RADIANS(? - longitude) / 2), 2)
          )
        ),
        3
      ) AS distanceKm
    FROM schools
    ORDER BY distanceKm ASC
  `;

  const [rows] = await pool.execute(query, [latitude, latitude, longitude]);

  return rows;
}

module.exports = {
  createSchool,
  getSchoolsSortedByDistance
};
