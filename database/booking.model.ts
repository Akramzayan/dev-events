import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Event from "./event.model";

/**
 * TypeScript interface representing a Booking document in MongoDB.
 */
export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Simple email regex to validate common email formats.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument, Model<BookingDocument>>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "eventId is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (email: string) => emailRegex.test(email),
        message: "Email must be a valid email address.",
      },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

/**
 * Pre-save hook ensures the referenced event exists in the database.
 */
bookingSchema.pre<BookingDocument>("save", async function () {
  const eventId = this.eventId;

  // Ensure that the referenced event exists before saving the booking.
  try {
    const exists = await Event.exists({ _id: eventId });
    if (!exists) {
      throw new Error("Referenced event does not exist.");
    }
  } catch {
    // If eventId is not a valid ObjectId, Mongoose will throw.
    throw new Error("Invalid eventId specified.");
  }
});

/**
 * Prevent model recompilation in development due to hot reloads.
 */
const Booking = (mongoose.models.Booking as Model<BookingDocument>) ||
  mongoose.model<BookingDocument>("Booking", bookingSchema);

export default Booking;
