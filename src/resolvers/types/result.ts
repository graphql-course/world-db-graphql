import { ELEMENT_SELECT, RESULTS } from "./../../config/constants";
import { IResolvers } from "@graphql-tools/utils";

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
};

export default resolverTypes;
