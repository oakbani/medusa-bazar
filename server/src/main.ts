import { Medusa } from 'medusa-extender';
import express = require('express');

import { StoreModule } from './modules/store/store.module';

async function bootstrap() {
    const expressInstance = express();

    await new Medusa(__dirname + '/../', expressInstance).load([
        StoreModule
    ]);

    expressInstance.listen(9000, () => {
        console.info('Server successfully started on port 9000');
    });
}

bootstrap()