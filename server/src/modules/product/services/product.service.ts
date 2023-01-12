import { EntityEventType, MedusaEventHandlerParams, OnMedusaEntityEvent, Service } from 'medusa-extender';

import { EntityManager } from "typeorm";
import { ProductService as MedusaProductService } from '@medusajs/medusa/dist/services';
import { Product } from '../entities/product.entity';
import { User } from '../../user/entities/user.entity';
import UserService from '../../user/services/user.service';

import { FlagRouter }from  '@medusajs/medusa/dist/utils/flag-router'
import { FilterableProductProps, FindProductConfig } from '@medusajs/medusa/dist/types/product';
import { Selector } from '@medusajs/medusa/dist/types/common';
import { FindWithoutRelationsOptions } from '@medusajs/medusa/dist/repositories/product';
import { Product as MedusaProduct } from '@medusajs/medusa/dist';

const TEMP_STORE_ID = 'store_01GMMM30YFSA5Y8HEED49MSFR0'

type ConstructorParams = {
    manager: any;
    // loggedInUser: User;
    productRepository: any;
    productVariantRepository: any;
    productOptionRepository: any;
    eventBusService: any;
    productVariantService: any;
    productCollectionService: any;
    productTypeRepository: any;
    productTagRepository: any;
    imageRepository: any;
    searchService: any;
    userService: UserService;
    featureFlagRouter: FlagRouter;
}

@Service({ scope: 'SCOPED', override: MedusaProductService })
export class ProductService extends MedusaProductService {
    readonly #manager: EntityManager;

    constructor(private readonly container: ConstructorParams) {
        super(container);
        this.#manager = container.manager;
    }

    protected prepareListQuery_(
        selector: FilterableProductProps | Selector<MedusaProduct>,
        config: FindProductConfig
      ): {
        q: string
        relations: (keyof MedusaProduct)[]
        query: FindWithoutRelationsOptions
      } {


        // const loggedInUser = this.container.loggedInUser
        // if (loggedInUser) {
        //     selector['store_id'] = loggedInUser.store_id
        // }

        selector['store_id'] = TEMP_STORE_ID

        return super.prepareListQuery_(selector, config);
      }


      @OnMedusaEntityEvent.Before.Insert(Product, { async: true })
      public async attachStoreToProduct(
          params: MedusaEventHandlerParams<Product, 'Insert'>
      ): Promise<EntityEventType<Product, 'Insert'>> {
          const { event } = params;
          // const loggedInUser = this.container.loggedInUser;
          // event.entity.store_id = loggedInUser.store_id;
          event.entity.store_id = TEMP_STORE_ID
          return event;
      }
}