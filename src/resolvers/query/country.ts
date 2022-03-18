// import UsersService from "./../../services/users.service";
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
      const paginationData = await pagination(
        context.db,
        'countries',
        args.page,
        args.itemsPage,
        {}
      );
      
      return {
        info: {
          page: paginationData.page,
          pages: paginationData.pages,
          itemsPage: paginationData.itemsPage,
          total: paginationData.total,
        },
        status: true,
        message: "Countries correct load",
        elementSelect: ELEMENT_SELECT.COUNTRIES,
        list: context.db
          .collection("countries")
          .find()
          .skip((args.page - 1) * 10)
          .limit(args.itemsPage)
          .sort({ id: 1 })
          .toArray(),
      };
      /*return new UsersService({pagination: {
        page: args.page,
        itemsPage: args.itemsPage
      }}, context).items(args.active);*/
    },
    country(
      _: {},
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      // return new UsersService(args, context).details();
    },
  },
};

export default queryCountryResolvers;
