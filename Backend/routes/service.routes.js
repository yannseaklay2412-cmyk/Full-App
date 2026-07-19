import { Router } from 'express'
import { getAllServices, getServiceById, createService, updateService, deleteService } from '../controllers/service.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Dental services offered by the clinic
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: List all services
 *     tags: [Services]
 *     security: []
 *     responses:
 *       200:
 *         description: List of services
 */
router.get('/',    getAllServices)

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service details
 */
router.get('/:id', getServiceById)

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a service (admin only)
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [service_name, duration_minutes]
 *             properties:
 *               service_name: { type: string }
 *               description: { type: string }
 *               price: { type: number, format: float }
 *               duration_minutes: { type: integer }
 *               image_url: { type: string }
 *     responses:
 *       201:
 *         description: Service created
 */
router.post('/',      protect, adminOnly, createService)

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service (admin only)
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name: { type: string }
 *               description: { type: string }
 *               price: { type: number, format: float }
 *               duration_minutes: { type: integer }
 *               image_url: { type: string }
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put('/:id',    protect, adminOnly, updateService)

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service (admin only)
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete('/:id', protect, adminOnly, deleteService)

export default router
