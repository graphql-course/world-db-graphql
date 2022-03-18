import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const resolverCountryType: IResolvers = {
  Country: {
    borders: async (parent, __, context: { db: Db }) => {
      // console.log(parent.borders);
      // Uso de operador "$in"
      // https://docs.mongodb.com/manual/reference/operator/query/in/
      return await context.db
        .collection("countries")
        .find({ iso3: { $in: parent.borders } })
        .toArray();
    }
  },
};

export default resolverCountryType;
