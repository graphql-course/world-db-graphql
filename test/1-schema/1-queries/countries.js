const EasyGraphQLTester = require("easygraphql-tester");
const { it } = require("mocha");

const apiSchema = require("./../../mocks/api-schema");

// const tester =
describe("Test Schema GraphQL - Query - cities", () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("'countries' válida - Sin usar Query Variables", () => {
    const query = `
    query Countries {
        countries {
          status
          message
          elementSelect
          ... on ResultCountries {
            list {
              id
              name
              iso3
              iso2
              numeric_code
              phone_code
              capital
              currency
              currency_name
              currency_symbol
              tld
              native
              region
              subregion
              timezones {
                zoneName
                gmtOffset
                gmtOffsetName
                abbreviation
                tzName
              }
            }
          }
        }
      }
    `;
    tester.test(true, query, {});
  });
  it("'countries' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query Cities($page: Int ) {
        cities(page: $page) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            status
            message
            elementSelect
            list {
              id
              name
              latitude
              longitude
              countryId
              country {
                name
                iso3
                capital
                currency
                native
                id
              }
            }
          }
        }
      }`;
    tester.test(true, query, { page: 5 });
  });
  it("'countries' válida - Usando Query Variables - Paginación - Página, Items Página", () => {
    const query = `
    query Cities($page: Int, $itemsPage: Int) {
        cities(page: $page, itemsPage: $itemsPage) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            status
            message
            elementSelect
            list {
              id
              name
              latitude
              longitude
              countryId
              country {
                name
                iso3
                capital
                currency
                native
                id
              }
            }
          }
        }
      }
    `;
    tester.test(true, query, { page: 2, itemsPage: 4 });
  });
});
