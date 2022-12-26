import {
    object,
    string,
    number,
    InferType
} from 'yup';

const sectionBaseSchema = object({
    id: number().required().integer()
});

const sectionCreateSchema = object({
    name: string().required().min(1).max(55),
});

const sectionUpdateSchema = object({}).concat(sectionBaseSchema).concat(sectionCreateSchema);

type SectionBaseType = InferType<typeof sectionBaseSchema>;
type SectionUpdateType = InferType<typeof sectionUpdateSchema>;
type SectionCreateType = InferType<typeof sectionCreateSchema>;

export {
    sectionBaseSchema,
    sectionCreateSchema,
    sectionUpdateSchema,
    SectionBaseType,
    SectionCreateType,
    SectionUpdateType
};