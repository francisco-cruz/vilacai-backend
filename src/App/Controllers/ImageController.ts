import { Image } from "../models/Image";
const dataSource = require("../../Database/dataSource");
import { ErrorHandler } from "../Errors/ErrorHandler";
const multer = require("multer");
const path = require("path");
import {
    ImageBaseType,
    ImageBaseSchema
} from "../Validators/Image";
const Utils = require("../Utils/Utils");

const imageRepository = dataSource.getRepository(Image);

class ImageController {
    private storage:any;
    public upload:any;

    constructor() {
        this.storage = multer.diskStorage({
            destination: (req:any, file:any, callBack:any) => {
                callBack(null, path.join(__dirname, '../../public/images/'))
            },
            filename: (req:any, file:any, callBack:any) => {
                callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });
        this.upload = multer({
            storage: this.storage
        });
    }

    async index(req:any,res:any): Promise<any> {
        const images = await imageRepository
            .createQueryBuilder('images')
            .getMany()

        return res.json({
            error: false,
            images: images
        });
    }

    async create(req:any,res:any): Promise<any> {
        if (!req.file)
            return res.status(400).json(
                new ErrorHandler(req.file, ['Image is a required field.']).handle());
        const imgsrc = '/images/' + req.file.filename;
        const extName = path.extname(req.file.originalname).toLowerCase();
        const fileTypes: Array<string> = [
            ".jpeg", ".jpg", ".png"
        ];
        if(!fileTypes.includes(extName))
            return res.status(400).json(
                new ErrorHandler(req.file, ["The file format is not supported."])
                    .handle());

        let saveImageToDb: any;
        try {
            saveImageToDb = await dataSource.getRepository(Image)
                .createQueryBuilder('image')
                .insert()
                .into(Image)
                .values({file_src: imgsrc})
                .execute();
        }catch(err:any) {
            return res.status(500).json(
                new ErrorHandler(req.file, err.message).handle());
        }
        return res.status(201).json({
            error: false,
            id: saveImageToDb.raw[0].id
        });
    }

    async show(req:any,res:any): Promise<any> {
        const image: ImageBaseType = {
            imageId: req.params.imageId
        };

        const validation = await ImageBaseSchema.validate(image)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(image, validation.errors).handle());

        const imageExists = await Utils.exists(Image, image.imageId);
        if(!imageExists)
            return res.status(404).json(
                new ErrorHandler(image, ['Image not found.']).handle());

        return res.sendFile(
            path.join(__dirname, "../../public" + imageExists.file_src));
    }
}

module.exports = new ImageController();