import {
    object,
    string,
    number,
    InferType,
    boolean
} from 'yup';

const fillingBaseSchema = object({
    id: number().required().integer().positive()
});

const fillingCreateSchema = object({
    name: string().required().min(1).max(45),
    available: boolean()
});

const fillingUpdateSchema = object({}).concat(fillingBaseSchema).concat(fillingCreateSchema);

type FillingBaseType = InferType<typeof fillingBaseSchema>;
type FillingUpdateType = InferType<typeof fillingUpdateSchema>;
type FillingCreateType = InferType<typeof fillingCreateSchema>;

export {
    fillingBaseSchema,
    fillingCreateSchema,
    fillingUpdateSchema,
    FillingBaseType,
    FillingCreateType,
    FillingUpdateType
};