const express = require('express')
const app = express()
const port = 3500
const {execute} = require('@getvim/execute')
const dotenv=require('dotenv')
const cron = require('node-cron')

const DBPASSWORD="b8390107bc42d740aafae5e539185014e9058c7995029f5edd352580942692f1"
const DBUSERNAME="qsshyzhiglxylw"
const DBNAME="d9hq8njskmgc15"
const DBHOST="ec2-52-21-136-176.compute-1.amazonaws.com"
const DBPORT='5432'

app.get("/",(req,res)=>{
	res.send("hello")
})

app.get('/backup', (req, res) => {
    backup()
})

app.listen(port || process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})

function backup() {
	const date = new Date();
	const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
	/* execute(`PGPASSWORD="${DBPASSWORD}" pg_dump -U ${DBUSERNAME} -d ${DBNAME} -h ${DBHOST} > LNE-database-backup-${currentDate}.sql`) */
	execute(`pg_dump -U qsshyzhiglxylw -h ec2-52-21-136-176.compute-1.amazonaws.com -d d9hq8njskmgc15 > db_dump.sql`)
	.then(async () => {
		console.log("Finito");
	}).catch(err => {
		console.log("error",err);
	})
}

/* cron.schedule('* * * * *', () => {
	console.log('running a task every minute');
	backup()
}); */