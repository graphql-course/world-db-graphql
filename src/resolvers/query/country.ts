// import UsersService from "./../../services/users.service";
import assert from 'assert';
import { Db } from 'mongodb';
import { pipeline } from 'stream';
import { ELEMENT_SELECT } from '../../config/constants';
import { aggregateOperation } from '../../lib/db-operations';
import { pagination } from '../../lib/pagination';

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
        'countries',
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
        elementSelect: ELEMENT_SELECT.COUNTRIES,
        list: context.db
          .collection('countries')
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
    async country(
      _: {},
      args: {
        id: string;
      },
      context: { db: Db }
    ) {
      const item = await context.db.collection('countries').findOne({
        id: +args.id,
      });
      return {
        status: item ? true : false,
        message: item
          ? 'Country correct load'
          : 'Country not found, please try again',
        elementSelect: ELEMENT_SELECT.COUNTRY,
        item,
      };
    },
  },
};

export default queryCountryResolvers;
