import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
        },
        supervisorRole: {
            type: String,
        },
        loginCode: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
