import { findOneElement } from "./../../lib/db-operations";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { COLLECTIONS } from "../../config/constants";

const resolverCityType: IResolvers = {
  City: {
    country: async (parent, __, context: { db: Db }) => {
      return await findOneElement(context.db, COLLECTIONS.countries, {
        id: parent.countryId,
      });
    },
  },
};

export default resolverCityType;
