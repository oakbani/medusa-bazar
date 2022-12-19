import { Medusa } from 'medusa-extender';
import express = require('express');

async function bootstrap() {
    const expressInstance = express();

    await new Medusa(__dirname + '/../', expressInstance).load([]);

    expressInstance.listen(9000, () => {
        console.info('Server successfully started on port 9000');
    });
}

bootstrap()