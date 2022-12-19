import { Store as MedusaStore } from '@medusajs/medusa/dist';
import { Entity, JoinColumn, OneToMany } from 'typeorm';
import { Entity as MedusaEntity } from 'medusa-extender';

@MedusaEntity({ override: MedusaStore })
@Entity()
export class Store extends MedusaStore {
    //TODO add relations
}