const { prisma } = require("./DatabaseAccessor");
const { getLogger } = require("../core/logging");

/**
 *
 * @param productTranslation { null | { ProductTranslationId: number, Translation: string, ProductId: number, CreatedAt: Date, UpdatedAt: Date, IsActive: boolean } }
 * @returns { undefined | { updated_at: Date, product_id: number, translation: string, created_at: Date, active: boolean, product_translation_id: number } }
 */
const mapPrismaType = (productTranslation) => (
    productTranslation === null ? undefined : {
        product_translation_id: productTranslation.ProductTranslationId,
        translation: productTranslation.Translation,
        product_id: productTranslation.ProductId,
        created_at: productTranslation.CreatedAt,
        updated_at: productTranslation.UpdatedAt,
        active: productTranslation.IsActive
    }
);

/**
 *
 * @returns {Promise<({updated_at: Date, product_id: number, translation: string, created_at: Date, active: boolean, product_translation_id: number}|undefined)[]>}
 */
const getAllProductTranslations = async () => {
    const productTranslations = await prisma.productTranslations.findMany();
    return productTranslations.map((productTranslation) => mapPrismaType(productTranslation));
};

/**
 *
 * @param id{number}
 * @returns {Promise<{updated_at: Date, product_id: number, translation: string, created_at: Date, active: boolean, product_translation_id: number}|undefined>}
 */
const getProductTranslationById = async (id) => {
    const productTranslation = await prisma.productTranslations.findFirst({
        where: { ProductTranslationId: id }
    });

    return mapPrismaType(productTranslation);
};

/**
 *
 *
 * @param id{number}
 * @returns {Promise<boolean>}
 */
const deleteProductTranslation = async (id) => {
    const productTranslation = getProductTranslationById(id);

    if (productTranslation === undefined) {
        getLogger().warning(`Tried deleting nonexistent product translation ${id}`);
        return false;
    }

    await prisma.productTranslations.delete({
        where: { ProductTranslationId: id }
    });

    return true;
};

module.exports = {
    getAllProductTranslations,
    getProductTranslationById,
    deleteProductTranslation
};