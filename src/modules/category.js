import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

//// Define a virtual property for the ID
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

///// Ensure virtuals are included when converting to JSON
categorySchema.set("toJSON", { virtuals: true });

//// Create and export the Category model
export const Category = mongoose.model("Category", categorySchema);
