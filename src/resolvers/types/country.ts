import { countElements, findElements } from "./../../lib/db-operations";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { COLLECTIONS } from "../../config/constants";

const resolverCountryType: IResolvers = {
  Country: {
    borders: async (parent: any, __: any, context: { db: Db }) => {
      // console.log(parent.borders);
      // Uso de operador "$in"
      // https://docs.mongodb.com/manual/reference/operator/query/in/
      return await findElements(context.db, COLLECTIONS.countries, {
        iso3: { $in: parent.borders },
      });
    },
    citiesInCountry: async (parent: any, __: any, context: { db: Db }) =>
      await countElements(context.db, COLLECTIONS.cities, {
        countryId: +parent.id,
      }),
    numericCode: (parent: {numeric_code: string}) => parent.numeric_code,
    phoneCode: (parent: {phone_code: string}) => parent.phone_code,
    currencyName: (parent: {currency_name: string}) => parent.currency_name,
    currencySymbol: (parent: {currency_symbol: string}) => parent.currency_symbol,
  },
};

export default resolverCountryType;
