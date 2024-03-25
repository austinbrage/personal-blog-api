import multer from "multer"
import { Router } from "express"
import { Sections as SectionController } from "../controllers/Sections"
import createAuthorization from "../auth/authorization"
import imageFileMiddleware from "../middlewares/image"
import { SectionRoutes as S, type ISection } from "../types/sections"
import { type IStyle } from "../types/styles"

type ModelsType = {
    styleModel: IStyle
    sectionModel: ISection
}

const createSectionRouter = ({ styleModel, sectionModel }: ModelsType) => {
    const sectionRouter = Router()

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })

    const writeAuth = createAuthorization('WRITE')
    const premiumAuth = createAuthorization('PREMIUM')

    const sectionController = new SectionController({ styleModel, sectionModel })

    sectionRouter.get(S.DATAS3,               sectionController.getSignedUrl)
    sectionRouter.get(S.EMPTY,                sectionController.getAll)
    sectionRouter.put(S.EMPTY,     writeAuth, sectionController.changeAll)
    sectionRouter.post(S.EMPTY,    writeAuth, sectionController.addNew)
    sectionRouter.delete(S.EMPTY,  writeAuth, sectionController.remove)
    
    sectionRouter.put(S.SEQUENCE,  writeAuth, sectionController.changeSequence)
    sectionRouter.post(S.MULTIPLE, writeAuth, sectionController.addMultiple)
    sectionRouter.post(S.TEMPLATE, writeAuth, sectionController.addTemplate)

    sectionRouter.post(
        S.DATAS3, 
        premiumAuth, 
        upload.single('image'), 
        imageFileMiddleware, 
        sectionController.addNewWithS3
    )

    sectionRouter.put(
        S.DATAS3, 
        premiumAuth, 
        upload.single('image'), 
        imageFileMiddleware, 
        sectionController.changeAllWithS3
    )

    return sectionRouter
}

export default createSectionRouter