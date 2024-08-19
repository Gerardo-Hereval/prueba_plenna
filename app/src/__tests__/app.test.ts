import request from 'supertest';
import connection from '../config/db';
import { RowDataPacket } from 'mysql2';
import app from '../routes/index'; // Asegúrate de exportar la instancia de `app` desde tu archivo principal

jest.mock('../config/db', () => ({
    query: jest.fn(),
}));


interface RowData extends RowDataPacket {
    currentTime: string;
}

describe('GET /', () => {
    let server: any;

    beforeAll(() => {
        server = app.listen(3000);
    });

    afterAll(() => {
        server.close();
    });

    it('should return the current time from the database', async () => {
        const mockRows = [{ currentTime: '2024-08-19 12:00:00' }] as RowData[];
        (connection.query as jest.Mock).mockResolvedValue([mockRows]);

        const res = await request(app).get('/');

        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Current time from DB: 2024-08-19 12:00:00');
    });
});
