import { Db } from "mongodb";
import { COLLECTIONS, ELEMENT_SELECT } from "../../config/constants";
import { countElements } from "../../lib/db-operations";
import ResolversOperationsService from "../../services/resolver-operations";

const queryCountryResolvers = {
  Query: {
    async countries(
      _: unknown,
      args: {
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      return new ResolversOperationsService(context.db).list(
        COLLECTIONS.countries,
        ELEMENT_SELECT.COUNTRIES,
        args.page, args.itemsPage
      );
    },
    async country(
      _: unknown,
      args: {
        id: string;
      },
      context: { db: Db }
    ) {

      return new ResolversOperationsService(context.db).get(
        COLLECTIONS.countries,
        ELEMENT_SELECT.COUNTRY,
        +args.id
      );
    },
    async countriesTotal(_: unknown, __: unknown, context: { db: Db} ) {
      return countElements(context.db, COLLECTIONS.countries);
    }
  },
};

export default queryCountryResolvers;
