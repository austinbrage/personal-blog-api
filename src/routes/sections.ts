import { Router } from "express"
import { Sections as SectionController } from "../controllers/Sections"
import createAuthorization from "../auth/authorization"
import { type ISection } from "../types/sections"
import { type IStyle } from "../types/styles"

type ModelsType = {
    styleModel: IStyle
    sectionModel: ISection
}

const createSectionRouter = ({ styleModel, sectionModel }: ModelsType) => {
    const sectionRouter = Router()

    const userAuth = createAuthorization()
    const sectionController = new SectionController({ styleModel, sectionModel })

    sectionRouter.get('/',    userAuth, sectionController.getAll)
    sectionRouter.put('/',    userAuth, sectionController.changeAll)
    sectionRouter.post('/',   userAuth, sectionController.addNew)
    sectionRouter.delete('/', userAuth, sectionController.remove)

    return sectionRouter
}

export default createSectionRouter