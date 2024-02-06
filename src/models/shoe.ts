import { InferSchemaType, model, Schema } from "mongoose";

const shoeSchema = new Schema({
    styleName: { type: String, required: true },
    heelHeight: { type: Number },
    color: { type: String, required: true },
    colorCode: { type: String },
    quote: { type: String },
    season: { type: String },
    year: { type: Number, required: true },
    capsuleCollection: { type: String },
    retailPrice: { type: Number },
    baseShoe: { type: String },
    material: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
}, { timestamps: true });

type Shoe = InferSchemaType<typeof shoeSchema>;

export default model<Shoe>("Shoe", shoeSchema);