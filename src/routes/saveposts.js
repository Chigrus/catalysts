import {init} from '@lib/sql';

export async function post(req, res) {
    const {id, title, subtitle, text} = req.body.data;
    const {connection} = await init();
    connection.query(`UPDATE posts SET title = ?, subtitle = ?, text = ? WHERE id = ?`, [title, subtitle, text, id], (err, result) => {
        if(err) {
            console.log(err);
            res.writeHead(500);
            res.end();
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });   
        res.end(JSON.stringify(result));
    });
}