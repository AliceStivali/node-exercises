import express from "express";
import prisma from "../lib/prisma/client";
import { planetSchema, PlanetType, validate } from "../lib/validation/index";

import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = express.Router();

router.get("/", async (request, response) => {
  const planets = await prisma.planet.findMany();

  response.json(planets);
});

router.get("/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);

  const planet = await prisma.planet.findUnique({
    where: { id: planetId },
  });

  if (!planet) {
    response.status(404);
    return next(`Cannot GET /planets/${planetId}`);
  }

  response.json(planet);
});

router.post(
  "/",
  validate({ body: planetSchema }),
  async (request, response) => {
    const planetData: PlanetType = request.body;

    const planet = await prisma.planet.create({
      data: planetData,
    });

    response.status(201).json(planet);
  }
);

router.put(
  "/:id(\\d+)",
  validate({ body: planetSchema }),
  async (request, response, next) => {
    const planetData: PlanetType = request.body;
    const planetId = Number(request.params.id);

    try {
      const planet = await prisma.planet.update({
        where: { id: planetId },
        data: planetData,
      });

      response.json(planet);
    } catch (e) {
      response.status(404);
      next(`Cannot PUT /planets/${planetId}`);
    }
  }
);

router.delete("/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);

  try {
    await prisma.planet.delete({
      where: { id: planetId },
    });

    response.status(204).end();
  } catch (e) {
    response.status(404);
    next(`Cannot DELETE /planets/${planetId}`);
  }
});

router.post(
  "/:id(\\d+)/photo",
  upload.single("photo"),
  async (request, response, next) => {
    if (!request.file) {
      response.status(400);
      return next("No photo uploaded");
    }

    const photoFilename = request.file.filename;

    const planetId = Number(request.params.id);

    try {
      await prisma.planet.update({
        where: { id: planetId },
        data: { photoFilename },
      });

      response.status(201).json({ photoFilename });
    } catch (e) {
      response.status(404);
      next(`Cannot POST /planets/${planetId}/photo`);
    }
  }
);

router.use("/photo", express.static("uploads/"));

export default router;
