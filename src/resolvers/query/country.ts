import { Db } from "mongodb";
import { ELEMENT_SELECT } from "../../config/constants";
import { pagination } from "../../lib/pagination";

const queryCountryResolvers = {
  Query: {
    async countries(
      _: {},
      args: {
        page: number;
        itemsPage: number;
      },
      context: { db: Db }
    ) {
      const { page, pages, itemsPage, total } = await pagination(
        context.db,
        "countries",
        args.page,
        args.itemsPage,
        {}
      );

      const list = await context.db
        .collection("countries")
        .find()
        .skip((args.page - 1) * args.itemsPage)
        .limit(args.itemsPage)
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
            ? "Countries correct load"
            : page > pages
            ? "Select page is not correct selection"
            : "Countries not load correctly. Please try again",
        elementSelect: ELEMENT_SELECT.COUNTRIES,
        list,
      };
    },
    async country(
      _: {},
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      const item = await context.db.collection("countries").findOne({
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
