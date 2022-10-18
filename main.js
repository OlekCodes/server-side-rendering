const { Pool } = require('pg');
const express = require('express');

const pool = new Pool({
    'host': 'localhost',
    'port': 5432,
    'user': 'postgres',
    'password': 'postgres',
    'database': 'postgres'
});

const app = express();

app.get('/article', async (req, res) => {
    if (req.query.author) {
        const article = (await pool.query('select content, author_name from article where author_name = $1', [req.query.author])).rows[0];
        res.status(200).send(`
            <html>
                <head>
                    <title>SSR</title>
                </head>
                <body>
                    <div style="border: 1px solid black; padding: 1rem; margin: 1rem;">
                        <p>${article?.content}</p>
                        <p style="font-style: italic">${article?.author_name}</p>
                    </div>
                </body>
            </html>
            `);
    } else {
        res.status(400).send('Query param "author" has not been provided');
    }
})

app.listen(8080, () => {
    console.log('Listening...');
});
