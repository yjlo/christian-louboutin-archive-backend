import { RequestHandler } from "express";
import ShoeModel from "../models/shoe";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getShoes: RequestHandler = async (req, res, next) => {
  try {
    const shoes = await ShoeModel.find().exec();
    res.status(200).json(shoes);
  } catch (error) {
    next(error);
  }
};

export const getShoe: RequestHandler = async (req, res, next) => {
  const shoeId = req.params.shoeId;

  try {
    if (!mongoose.isValidObjectId(shoeId)) {
      throw createHttpError(400, "Invalid shoe id");
    }

    const shoe = await ShoeModel.findById(shoeId).exec();

    if (!shoe) {
      throw createHttpError(404, "Shoe not found");
    }

    res.status(200).json(shoe);
  } catch (error) {
    next(error);
  }
};

interface CreateShoeBody {
  styleName?: string;
  heelHeight?: number;
  color?: string;
  colorCode?: string;
  quote?: string;
  season?: string;
  year?: number;
  capsuleCollection?: string;
  retailPrice?: number;
  baseShoe?: string;
  material?: string;
  description?: string;
  tags?: Array<string>;
}

export const createShoe: RequestHandler<
  unknown,
  unknown,
  CreateShoeBody,
  unknown
> = async (req, res, next) => {
  const styleName = req.body.styleName;
  const heelHeight = req.body.heelHeight;
  const color = req.body.color;
  const colorCode = req.body.colorCode;
  const quote = req.body.quote;
  const season = req.body.season;
  const year = req.body.year;
  const capsuleCollection = req.body.capsuleCollection;
  const retailPrice = req.body.retailPrice;
  const baseShoe = req.body.baseShoe;
  const material = req.body.material;
  const description = req.body.description;
  const tags = req.body.tags;

  try {
    if (!styleName) {
      throw createHttpError(400, "Shoe must have a style name");
    }

    if (!color) {
        throw createHttpError(400, "Shoe must have color");
    }

    if (!year) {
        throw createHttpError(400, "Shoe must have a year");
    }

    if (!material) {
        throw createHttpError(400, "Shoe must have material");
    }

    if (!description) {
        throw createHttpError(400, "Shoe must have description");
    }

    if (!tags) {
        throw createHttpError(400, "Shoe must have tags");
    }

    const newShoe = await ShoeModel.create({
      styleName: styleName,
      heelHeight: heelHeight,
      color: color,
      colorCode: colorCode,
      quote: quote,
      season: season,
      year: year,
      capsuleCollection: capsuleCollection,
      retailPrice: retailPrice,
      baseShoe: baseShoe,
      material: material,
      description: description,
      tags: tags,
    });

    res.status(201).json(newShoe);
  } catch (error) {
    next(error);
  }
};

interface UpdateShoeParams {
  shoeId: string;
}

interface UpdateShoeBody {
  styleName?: string;
  heelHeight?: number;
  color?: string;
  colorCode?: string;
  quote?: string;
  season?: string;
  year?: number;
  capsuleCollection?: string;
  retailPrice?: number;
  baseShoe?: string;
  material?: string;
  description?: string;
  tags?: Array<string>;
}

export const updateShoe: RequestHandler<
  UpdateShoeParams,
  unknown,
  UpdateShoeBody,
  unknown
> = async (req, res, next) => {
  const shoeId = req.params.shoeId;
  const newStyleName = req.body.styleName;
  const newHeelHeight = req.body.heelHeight;
  const newColor = req.body.color;
  const newColorCode = req.body.colorCode;
  const newQuote = req.body.quote;
  const newSeason = req.body.season;
  const newYear = req.body.year;
  const newCapsuleCollection = req.body.capsuleCollection;
  const newRetailPrice = req.body.retailPrice;
  const newBaseShoe = req.body.baseShoe;
  const newMaterial = req.body.material;
  const newDescription = req.body.description;
  const newTags = req.body.tags;

  try {
    if (!mongoose.isValidObjectId(shoeId)) {
      throw createHttpError(400, "Invalid shoe id");
    }

    if (!newStyleName) {
      throw createHttpError(400, "Shoe must have a style name");
    }

    if (!newColor) {
        throw createHttpError(400, "Shoe must have color");
    }

    if (!newYear) {
        throw createHttpError(400, "Shoe must have a year");
    }

    if (!newMaterial) {
        throw createHttpError(400, "Shoe must have material");
    }

    if (!newDescription) {
        throw createHttpError(400, "Shoe must have description");
    }

    if (!newTags) {
        throw createHttpError(400, "Shoe must have tags");
    }

    const shoe = await ShoeModel.findById(shoeId).exec();

    if (!shoe) {
      throw createHttpError(404, "Shoe not found");
    }

    shoe.styleName = newStyleName;
    shoe.heelHeight = newHeelHeight;
    shoe.color = newColor;
    shoe.colorCode = newColorCode;
    shoe.quote = newQuote;
    shoe.season = newSeason;
    shoe.year = newYear;
    shoe.capsuleCollection = newCapsuleCollection;
    shoe.retailPrice = newRetailPrice;
    shoe.baseShoe = newBaseShoe;
    shoe.material = newMaterial;
    shoe.description = newDescription;
    shoe.tags = newTags;

    const updatedShoe = await shoe.save();

    res.status(200).json(updatedShoe);
  } catch (error) {
    next(error);
  }
};

export const deleteShoe: RequestHandler = async (req, res, next) => {
    const shoeId = req.params.shoeId;
  
    try {
      if (!mongoose.isValidObjectId(shoeId)) {
        throw createHttpError(400, "Invalid shoe id");
      }
  
      const shoe = await ShoeModel.findById(shoeId).exec();
  
      if (!shoe) {
        throw createHttpError(404, "Shoe not found");
      }
  
      await shoe.deleteOne();

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
