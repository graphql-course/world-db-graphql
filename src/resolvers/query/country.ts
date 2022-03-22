import { Db } from "mongodb";
import { COLLECTIONS, ELEMENT_SELECT } from "../../config/constants";
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
      const item = await context.db.collection(COLLECTIONS.countries).findOne({
        id: +args.id,
      });
      return {
        status: item ? true : false,
        message: item
          ? "Country correct load"
          : "Country not found, please try again",
        elementSelect: ELEMENT_SELECT.COUNTRY,
        item,
      };
    },
  },
};

export default queryCountryResolvers;
