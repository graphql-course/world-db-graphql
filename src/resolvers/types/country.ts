import { findElements } from "./../../lib/db-operations";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { COLLECTIONS } from "../../config/constants";

const resolverCountryType: IResolvers = {
  Country: {
    borders: async (parent, __, context: { db: Db }) => {
      // console.log(parent.borders);
      // Uso de operador "$in"
      // https://docs.mongodb.com/manual/reference/operator/query/in/
      return await findElements(context.db, COLLECTIONS.countries, {
        iso3: { $in: parent.borders },
      });
    },
  },
};

export default resolverCountryType;
