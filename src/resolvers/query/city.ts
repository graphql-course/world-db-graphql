import { COLLECTIONS } from './../../config/constants';
// import UsersService from "./../../services/users.service";
import { Db } from "mongodb";
import { ELEMENT_SELECT } from "../../config/constants";
import { pagination } from "../../lib/pagination";
import ResolversOperationsService from '../../services/resolver-operations';

const queryCityResolvers = {
  Query: {
    async cities(
      _: {},
      args: {
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      return new ResolversOperationsService(context.db).list(
        COLLECTIONS.cities,
        ELEMENT_SELECT.CITIES,
        args.page, args.itemsPage
      )
    },
    async city(
      _: {},
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      const item = await context.db.collection(COLLECTIONS.cities).findOne({
        id: +args.id,
      });
      return {
        status: item ? true : false,
        message: item
          ? "City correct load"
          : "City not found, please try again",
        elementSelect: ELEMENT_SELECT.CITY,
        item,
      };
    },
    async citiesByCountry(
      _: {},
      args: {
        country: string;
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      const { page, pages, itemsPage, total } = await pagination(
        context.db,
        COLLECTIONS.cities,
        args.page,
        args.itemsPage,
        {
          countryId: +args.country,
        }
      );

      const list = await context.db
        .collection(COLLECTIONS.cities)
        .find({
          countryId: +args.country,
        })
        .skip((args.page - 1) * args.itemsPage)
        .limit(itemsPage)
        .sort({ id: 1 })
        .toArray();

      return {
        info: {
          page,
          pages,
          itemsPage,
          total,
        },
        status: list && list.length ? true : false,
        message:
          list && list.length
            ? "Cities by select country correct load"
            : page > pages
            ? "Select page is not correct selection"
            : "Cities by select countries not load correctly. Please try again",
        elementSelect: ELEMENT_SELECT.CITIES,
        list,
      };
    },
  },
};

export default queryCityResolvers;
