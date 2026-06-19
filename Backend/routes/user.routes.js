import { Router } from 'express'
import * as patientController from '../controllers/patient.controller.js'
import { protect , adminOnly} from '../middleware/auth.middleware.js'

const router = Router()

router.get('/me',     protect,            patientController.getMyProfile)
router.put('/me',     protect,            patientController.updateMyProfile)
router.get('/',       protect, adminOnly, patientController.getAllPatients)
router.get('/:id',    protect, adminOnly, patientController.getPatientById)
router.patch('/:id/ban', protect, adminOnly, patientController.banPatient)

export default router