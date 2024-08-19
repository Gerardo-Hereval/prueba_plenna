import express, { Request, Response } from 'express';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2';

const app = express();
const port = process.env.PORT || 3000;

interface RowData extends RowDataPacket {
    currentTime: string;
}

app.get('/', async (req: Request, res: Response) => {
    const [rows] = await connection.query<RowData[]>('SELECT NOW() as currentTime');
    res.send(`Current time from DB: ${rows[0].currentTime}`);
});



if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

export default app;
