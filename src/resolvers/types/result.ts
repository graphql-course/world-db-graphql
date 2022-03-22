import { findOneElement } from "./../../lib/db-operations";
import { COLLECTIONS, ELEMENT_SELECT, RESULTS } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const resolverTypes: IResolvers = {
  Result: {
    __resolveType(root: { elementSelect: string }) {
      if (root.elementSelect === ELEMENT_SELECT.COUNTRY) {
        return RESULTS.country;
      }
      if (root.elementSelect === ELEMENT_SELECT.CITY) {
        return RESULTS.city;
      }
      if (root.elementSelect === ELEMENT_SELECT.COUNTRIES) {
        return RESULTS.countries;
      }
      if (root.elementSelect === ELEMENT_SELECT.CITIES) {
        return RESULTS.cities;
      }
      return null; // GraphQLError is thrown
    },
  },
  ResultCities: {
    selectCountry: async (parent, __, context: { db: Db }, info) => {
      console.log(parent);
      // console.log(parent.borders);
      // Uso de operador "$in"
      // https://docs.mongodb.com/manual/reference/operator/query/in/
      return info.path.prev?.key === "cities"
        ? ""
        : parent.status ? findOneElement(context.db, COLLECTIONS.countries, {
          id: parent.list[0].countryId,
        }).then((result: any) => result.name) : "";
    },
  },
};

export default resolverTypes;
