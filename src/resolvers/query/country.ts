import { randomItems } from './../../lib/db-operations';
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
        args.page,
        args.itemsPage
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
    async countriesTotal(_: unknown, __: unknown, context: { db: Db }) {
      return countElements(context.db, COLLECTIONS.countries);
    },
    async countriesRandom(_: unknown, __: unknown, context: { db: Db }) {
      const list = await randomItems(context.db, COLLECTIONS.countries);
      const listElement = ELEMENT_SELECT.COUNTRIES;
      return {
        info: null,
        status: list && list.length ? true : false,
        message:
          list && list.length
            ? `${listElement[0]
                .toUpperCase()
                .concat(listElement.substring(1))} correct load`
            : `${listElement[0]
                .toUpperCase()
                .concat(
                  listElement.substring(1)
                )} not load correctly. Please try again`,
        elementSelect: listElement,
        list,
      }
    },
  },
};

export default queryCountryResolvers;
