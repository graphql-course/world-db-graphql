import { COLLECTIONS } from "./../../config/constants";
import { Db } from "mongodb";
import { ELEMENT_SELECT } from "../../config/constants";
import ResolversOperationsService from "../../services/resolver-operations";
import { countElements } from "../../lib/db-operations";

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
        country: number;
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
    async citiesTotal(_: unknown, __: unknown, context: { db: Db} ) {
      return countElements(context.db, COLLECTIONS.cities);
    },
    async citiesByCountryTotal(_: unknown, args: {
      country: number;
    }, context: { db: Db} ) {
      return countElements(context.db, COLLECTIONS.cities, { countryId: +args.country});
    }
  },
};

export default queryCityResolvers;
