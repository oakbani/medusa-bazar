import { Module } from 'medusa-extender';
import { Store } from './entities/store.entity';
import StoreRepository from './repositories/store.repository';

@Module({
    imports: [Store, StoreRepository],
})
export class StoreModule {}