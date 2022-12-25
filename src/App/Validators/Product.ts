import {
    object,
    string,
    number,
    boolean,
    InferType
} from 'yup';

const productBaseSchema = object({
    id: number().required().integer().positive(),
});

const productCreateSchema = object({
    section: number().required().integer().min(1).positive(),
    name: string().required().min(1).max(55),
    price: number().min(0.01).required().positive(),
    available: boolean()
});

const productAddFillingSchema = object({
    productId: number().required().integer().positive(),
    fillingId: number().required().integer().positive()
});

const productUpdateSchema = object({})
    .concat(productBaseSchema).concat(productCreateSchema);

type ProductCreateType = InferType<typeof productCreateSchema>;
type ProductBaseType = InferType<typeof productBaseSchema>;
type ProductUpdateType = InferType<typeof productUpdateSchema>;
type ProductAddFillingType = InferType<typeof productAddFillingSchema>;

export {
    productCreateSchema,
    productBaseSchema,
    ProductCreateType,
    productUpdateSchema,
    ProductBaseType,
    ProductUpdateType,
    ProductAddFillingType,
    productAddFillingSchema
};