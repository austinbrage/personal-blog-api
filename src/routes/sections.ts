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

    const writeAuth = createAuthorization('WRITE')

    const sectionController = new SectionController({ styleModel, sectionModel })

    sectionRouter.get(S.EMPTY,                sectionController.getAll)
    sectionRouter.put(S.EMPTY,     writeAuth, sectionController.changeAll)
    sectionRouter.post(S.EMPTY,    writeAuth, sectionController.addNew)
    sectionRouter.delete(S.EMPTY,  writeAuth, sectionController.remove)
    
    sectionRouter.put(S.SEQUENCE,  writeAuth, sectionController.changeSequence)
    sectionRouter.post(S.MULTIPLE, writeAuth, sectionController.addMultiple)
    sectionRouter.post(S.TEMPLATE, writeAuth, sectionController.addTemplate)

    return sectionRouter
}

export default createSectionRouter