const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { Pool } = require('pg')
const jwt = require('jsonwebtoken');
const { cryptPassword, checkPassword } = require('./middlewares/bcrypt')

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'calendar',
    password: 'Nirvana60',
    port: '3003',
})

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('build'));

const getAllEvents = async() => {
    const { rows } = await pool.query(`SELECT * FROM events`)
    return rows
}

const addEvent = async(event) => {
    const { name, startdate, enddate } = event;
    const { rows } = await pool.query(`INSERT INTO events(name, startdate, enddate) VALUES($1, $2, $3) RETURNING *`, [name, startdate, enddate]);
    return rows[0]
}

const createUser = async(userId, name, email, password, color) => {
    const { rows } = await pool.query(`INSERT INTO users(userid, name, email, password, color) VALUES($1, $2, $3, $4, $5) RETURNING *`, [userId, name, email, password, color])
    return rows[0]
}

const getUserByEmail = async(email) => {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    return rows[0]
}

const emailValidation = async (email) => {
    const { rows } = await pool.query(`
      SELECT
        COUNT(email)
      FROM
        users
      WHERE
        email = $1
    `, [email])
  
    return rows[0];
  }

app.get('/events', async (req, res) => {
    const events = await getAllEvents();
    try {
        res.send(events)
    } catch(err) {
        res.status(404).send('No events found')
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email)
        if(!user) {
            res.status(401).send('Email is not valid')
        }
        const match = await checkPassword(password, user.password)
        if(!match) {
            res.status(401).send('Password is not correct')
        }

        const token = jwt.sign({
            id: user.userid,
            color: user.color,
            name: user.name
        }, new Buffer('FiskerTrollen', 'base64'))

        res.send({
            token: token
        })
    } catch (err) {
        res.status(404).send(err.message)
    }

})

app.post('/event', async (req, res) => {
    const event = req.body
    const newEvent = await addEvent(event);
    try {
        res.send(newEvent)
    } catch (err) {
        res.status(406).send('Invalid input')
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, password, color } = req.body;
    const userId = Math.floor(Math.random()*1000000000)

    const validEmail = await emailValidation(email);
    const hashPassword = await cryptPassword(password);

    try {
        if(+validEmail.count) {
            return res.status(403).send('Email already in use')
        } else {
            const newUser = await createUser(userId, name, email, hashPassword, color);
            res.send(newUser);
        }
    } catch {
        res.status(406).send('Invalid input')
    }
})


const port = 3333
app.listen(port, () => {
    console.log(`Planner-app is running at http://localhost:${port}`)
})