import {
    object,
    number,
    InferType,
} from 'yup';

const ImageBaseSchema = object({
    imageId: number().required().integer().positive()
});

type ImageBaseType = InferType<typeof ImageBaseSchema>;

export {
    ImageBaseSchema,
    ImageBaseType
};