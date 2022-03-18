import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const resolverCityType: IResolvers = {
  City: {
    country: async (parent, __, context: { db: Db }) => {
      // console.log(parent.borders);
      // Uso de operador "$in"
      // https://docs.mongodb.com/manual/reference/operator/query/in/
      return await context.db
        .collection("countries")
        .findOne({ id: parent.countryId });
    }
  },
};

export default resolverCityType;