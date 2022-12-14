import {
    object,
    string,
    number,
    boolean,
    InferType
} from 'yup';

const productSchema = object({
    name: string().required().min(1).max(55),
    price: number().min(0.01).required(),
    available: boolean().nullable(),
});

type ProductType = InferType<typeof productSchema>;

export {productSchema, ProductType};