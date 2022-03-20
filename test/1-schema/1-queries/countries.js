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
            info {
              page
              total
              itemsPage
              pages
            }
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
    query Countries($page: Int) {
        countries(page: $page) {
          status
          message
          elementSelect
          ... on ResultCountries {
            info {
              page
              total
              itemsPage
              pages
            }
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
      }`;
    tester.test(true, query, { page: 5 });
  });
  it("'countries' válida - Usando Query Variables - Paginación - Página, Items Página", () => {
    const query = `
    query Countries($page: Int, $itemsPage: Int) {
        countries(page: $page, itemsPage: $itemsPage) {
          status
          message
          elementSelect
          ... on ResultCountries {
            info {
              page
              total
              itemsPage
              pages
            }
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
    tester.test(true, query, { page: 2, itemsPage: 4 });
  });

  it("'countries' inválida - Pasar página seleccionada en un string", () => {
    const query = `
    query Countries($page: Int) {
        countries(page: $page) {
          status
          message
          elementSelect
          ... on ResultCountries {
            info {
              page
              total
              itemsPage
              pages
            }
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
    tester.test(false, query, { page: '2' });
  });
});
