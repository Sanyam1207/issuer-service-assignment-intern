import mongoose, { Document, Schema } from "mongoose";

export interface ICredential extends Document {
  userId: string;
  encryptedData: string;
  issuedAt: Date;
  worker: string;
}

const CredentialSchema = new Schema<ICredential>({
  userId: { type: String, required: true, unique: true },
  encryptedData: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
  worker: { type: String, required: true }
});

export default mongoose.model<ICredential>("Credential", CredentialSchema);
