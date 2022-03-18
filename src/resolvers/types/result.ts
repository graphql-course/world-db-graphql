import { ELEMENT_SELECT } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";

const resolverTypes: IResolvers = {
  Result: {
    __resolveType(root: { elementSelect: string }) {
     
      if (root.elementSelect === ELEMENT_SELECT.COUNTRY) {
        return "ResultCountry";
      }
      if (root.elementSelect === ELEMENT_SELECT.CITY) {
        return "ResultCity";
      }
      if (root.elementSelect === ELEMENT_SELECT.COUNTRIES) {
        return "ResultCountries";
      }
      if (root.elementSelect === ELEMENT_SELECT.CITIES) {
        return "ResultCities";
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default resolverTypes;
