// import UsersService from "./../../services/users.service";
import { Db } from "mongodb";

const queryCountryResolvers = {
  Query: {
    countries(
      _: {},
      args: {
        page: number;
        itemsPage: number;
        active: string;
      },
      context: { db: Db }
    ) {
      /*return new UsersService({pagination: {
        page: args.page,
        itemsPage: args.itemsPage
      }}, context).items(args.active);*/
    },
    country(
      _: {},
      args: {
        id: string
      },
      context: { db: Db }
    ) {
      // return new UsersService(args, context).details();
    }
  },
};

export default queryCountryResolvers;