// import UsersService from "./../../services/users.service";
import { Db } from 'mongodb';
import { ELEMENT_SELECT } from '../../config/constants';
import { pagination } from '../../lib/pagination';

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
      const { page, pages, itemsPage, total } = await pagination(
        context.db,
        'cities',
        args.page,
        args.itemsPage,
        {}
      );
      return {
        info: {
          page,
          pages,
          itemsPage,
          total,
        },
        status: true,
        message: 'Countries correct load',
        elementSelect: ELEMENT_SELECT.CITIES,
        list: context.db
          .collection('cities')
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
    city(
      _: {},
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      // return new UsersService(args, context).details();
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
        'cities',
        args.page,
        args.itemsPage,
        {
          countryId: +args.country,
        }
      );
      console.log(pages, total, itemsPage, page);
      const data = await context.db
        .collection('cities')
        .find({
          countryId: +args.country,
        })
        .skip((page - 1) * 10)
        .limit(itemsPage)
        .sort({ id: 1 })
        .toArray();
      console.log(data);
    },
  },
};

export default queryCityResolvers;
