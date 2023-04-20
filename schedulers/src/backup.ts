// importing required modules
const { execute } = require("@getvim/execute");
const dotenv = require("dotenv").config();

// getting db connection parameters from environment file
const username = process.env.POSTGRES_USER;
const database = process.env.POSTGRES_DB;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;

// defining backup file name
const date = new Date();
const currentDate = `${date.getFullYear()}.${
  date.getMonth() + 1
}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.tar`;

// TODO: almacenar en una carpeta especifica.

// writing postgresql backup function
const makeDatabaseBackup = () => {
  execute(
    `PGPASSWORD=${process.env.POSTGRES_PASSWORD} pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${fileName} -F t -d ${database}`
  )
    .then(async () => {
      console.log(`Backup created successfully`);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export { makeDatabaseBackup };
