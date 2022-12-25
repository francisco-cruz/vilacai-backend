import {
    object,
    string,
    number,
    InferType
} from 'yup';

const productTypeSchema = object({
    id: number().required().integer().positive()
});

const productTypeCreateSchema = object({
    type: string().required().min(1).max(45)
});

type ProductTypeCreateType = InferType<typeof productTypeCreateSchema>;
type ProductTypeBaseType = InferType<typeof productTypeSchema>;

export {
    ProductTypeCreateType,
    ProductTypeBaseType,
    productTypeSchema,
    productTypeCreateSchema
};