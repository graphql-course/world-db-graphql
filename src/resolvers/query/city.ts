import { COLLECTIONS } from "./../../config/constants";
import { Db } from "mongodb";
import { ELEMENT_SELECT } from "../../config/constants";
import ResolversOperationsService from "../../services/resolver-operations";

const queryCityResolvers = {
  Query: {
    async cities(
      _: unknown,
      args: {
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      return new ResolversOperationsService(context.db).list(
        COLLECTIONS.cities,
        ELEMENT_SELECT.CITIES,
        args.page,
        args.itemsPage
      );
    },
    async city(
      _: unknown,
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      return new ResolversOperationsService(context.db).get(
        COLLECTIONS.cities,
        ELEMENT_SELECT.CITY,
        +args.id
      );
    },
    async citiesByCountry(
      _: unknown,
      args: {
        country: string;
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      return new ResolversOperationsService(context.db).list(
        COLLECTIONS.cities,
        ELEMENT_SELECT.CITIES,
        args.page,
        args.itemsPage,
        {
          countryId: +args.country,
        }
      );
    },
  },
};

export default queryCityResolvers;
