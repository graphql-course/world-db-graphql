const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('./../../mocks/api-schema');

// const tester =
describe('Test Schema GraphQL - Query - cities By Country', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("'citiesByCountry' válida - Usando el id del país (country)", () => {
    const query = `
    query CitiesByCountry($country: ID!) {
        citiesByCountry(country: $country) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            list {
              id
              name
              latitude
              longitude
            }
            elementSelect
            message
            status
          }
        }
      }
    `;
    tester.test(true, query, { country: 1 });
    tester.test(true, query, { country: '1' });
  });
  it("'citiesByCountry' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query CitiesByCountry($country: ID!, $page: Int) {
        citiesByCountry(country: $country, page: $page) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            list {
              id
              name
              latitude
              longitude
            }
            elementSelect
            message
            status
          }
        }
      }
    `;
    tester.test(true, query, { country: 1, page: 5 });
  });
  it("'cities' válida - Usando Query Variables - Paginación - Página, Items Página", () => {
    const query = `
    query CitiesByCountry($country: ID!, $page: Int, $itemsPage: Int) {
        citiesByCountry(country: $country, page: $page, itemsPage: $itemsPage) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            list {
              id
              name
              latitude
              longitude
            }
            elementSelect
            message
            status
          }
        }
      }
    `;
    tester.test(true, query, { country: 1, page: 2, itemsPage: 4 });
  });
  it("'citiesByCountry' inválida - No pasar 'country'", () => {
    const query = `
    query CitiesByCountry($country: ID!, $page: Int, $itemsPage: Int) {
        citiesByCountry(country: $country, page: $page, itemsPage: $itemsPage) {
          ... on ResultCities {
            info {
              page
              total
              itemsPage
              pages
            }
            list {
              id
              name
              latitude
              longitude
            }
            elementSelect
            message
            status
          }
        }
      }
    `;
    tester.test(false, query, { page: 1 });
  });
});
