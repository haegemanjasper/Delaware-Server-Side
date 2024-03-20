const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 * @param product { null | { ProductId: number, Price: number, Stock: number, UnitOfMeasurement: string, ProductCategory: number, ProductAvailability: string, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { unit_of_measurement: string, updated_at: Date, price: number, product_id: number, product_availability: string, created_at: Date, active: boolean, stock: number, product_category: number } }
 */
const mapPrismaType = (product) => (
    product === null ? undefined : {
        product_id: product.ProductId,
        price: product.Price,
        stock: product.Stock,
        unit_of_measurement: product.UnitOfMeasurement,
        product_category: product.ProductCategory,
        product_availability: product.ProductAvailability,
        created_at: product.CreatedAt,
        updated_at: product.UpdatedAt,
        active: product.IsActive
    }
);

/**
 * @returns {Promise<({unit_of_measurement: string, updated_at: Date, price: number, product_id: number, product_availability: string, created_at: Date, active: boolean, stock: number, product_category: number}|undefined)[]>}
 */
const getAllProducts = async () => {
    const products = await prisma.products.findMany();
    return products.map((product) => mapPrismaType(product));
};

/**
 *
 * @param id {number}
 * @returns {Promise<{unit_of_measurement: string, updated_at: Date, price: number, product_id: number, product_availability: string, created_at: Date, active: boolean, stock: number, product_category: number}|undefined>}
 */
const getProductById = async (id) => {
    const product = await prisma.products.findFirst({
        where: { ProductId: id }
    });

    return mapPrismaType(product);
};

/**
 *
 * @param id {number}
 * @returns {Promise<boolean>}
 */
const deleteProduct = async (id) => {
    const product = await getProductById(id);

    if (product === undefined) {
        getLogger().warning(`Tried deleting nonexistent product ${id}`);
        return false;
    }

    await prisma.products.delete({
        where: { ProductId: id }
    });

    return true;
};

module.exports = {
    getAllProducts,
    getProductById,
    deleteProduct
};