import { Router } from "express"
import { Sections as SectionController } from "../controllers/Sections"
import createAuthorization from "../auth/authorization"
import { SectionRoutes as S, type ISection } from "../types/sections"
import { type IStyle } from "../types/styles"

type ModelsType = {
    styleModel: IStyle
    sectionModel: ISection
}

const createSectionRouter = ({ styleModel, sectionModel }: ModelsType) => {
    const sectionRouter = Router()

    const userAuth = createAuthorization()
    const sectionController = new SectionController({ styleModel, sectionModel })

    sectionRouter.get(S.EMPTY,     sectionController.getAll)
    sectionRouter.put(S.EMPTY,     userAuth, sectionController.changeAll)
    sectionRouter.post(S.EMPTY,    userAuth, sectionController.addNew)
    sectionRouter.delete(S.EMPTY,  userAuth, sectionController.remove)

    sectionRouter.post(S.MULTIPLE, userAuth, sectionController.addMultiple)
    sectionRouter.post(S.TEMPLATE, userAuth, sectionController.addTemplate)

    return sectionRouter
}

export default createSectionRouter