import {
    object,
    string,
    number,
    boolean,
    InferType
} from 'yup';

const productCreateSchema = object({
    name: string().required().min(1).max(55),
    price: number().min(0.01).required(),
    available: boolean().nullable(),
});

const productUpdateSchema = object({
    id: number().required()
});

type ProductType = InferType<typeof productCreateSchema>;
type ProductUpdateType = InferType<typeof productUpdateSchema>;

export {productCreateSchema, productUpdateSchema, ProductType, ProductUpdateType};