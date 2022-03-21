import { findElements, findOneElement } from "./../lib/db-operations";
import { Db } from "mongodb";
import { pagination } from "../lib/pagination";

class ResolversOperationsService {
  private db!: Db;

  constructor(db: Db) {
    this.db = db;
  }

  getDb = () => this.db;
  // Listar información
  async list(
    collection: string,
    listElement: string,
    page = 1,
    itemsPage = 20,
    filter: object = {}
  ) {
    try {
      const paginationData = await pagination(
        this.getDb(),
        collection,
        page,
        itemsPage,
        filter
      );
      const list = await findElements(
        this.getDb(),
        collection,
        filter,
        paginationData
      );
      return {
        info: {
          page: paginationData.page,
          pages: paginationData.pages,
          itemsPage: paginationData.itemsPage,
          total: paginationData.total,
        },
        status: list && list.length ? true : false,
        message:
          list && list.length
            ? `${listElement[0]
                .toUpperCase()
                .concat(listElement.substring(1))} correct load`
            : page > paginationData.pages
            ? "Select page is not correct selection"
            : `${listElement[0]
                .toUpperCase()
                .concat(
                  listElement.substring(1)
                )} not load correctly. Please try again`,
        elementSelect: listElement,
        list,
      };
    } catch (error) {
      return {
        info: null,
        status: false,
        message: `Lista de ${listElement} no cargada: ${error}`,
        elementSelect: listElement,
        list: null,
      };
    }
  }
  // Obtener detalles del item
  protected async get(collection: string, id: number | string) {
    const collectionLabel = collection.toLowerCase();
    try {
      return await findOneElement(this.getDb(), collection, {
        id,
      }).then((result: any) => {
        if (result) {
          return {
            status: true,
            message: `${collectionLabel} ha sido cargada correctamente con sus detalles`,
            item: result,
          };
        }
        return {
          status: true,
          message: `${collectionLabel} no ha obtenido detalles porque no existe`,
          item: null,
        };
      });
    } catch (error) {
      return {
        status: false,
        message: `Error inesperado al querer cargar los detalles de ${collectionLabel}`,
        item: null,
      };
    }
  }
}

export default ResolversOperationsService;
