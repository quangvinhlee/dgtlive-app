import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interface for FIDE player document
export type FidePlayerDocument = FidePlayer & Document;

@Schema({ _id: false })
export class PlayerRating {
  @Prop({ required: false })
  std: string;

  @Prop({ required: false })
  rapid: string;

  @Prop({ required: false })
  blitz: string;
}

const PlayerRatingSchema = SchemaFactory.createForClass(PlayerRating);

@Schema({ timestamps: true })
export class FidePlayer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  fideTitle: string | null;

  @Prop({ required: false })
  title: string | null;

  @Prop({ required: false })
  id: string;

  @Prop({ required: false })
  table: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  federation: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  rank: string;

  @Prop({ required: false })
  birthYear: string;

  @Prop({ required: false, default: 0 })
  errorCount: number;
  @Prop({ schema: PlayerRatingSchema })
  ratings: PlayerRating;

  @Prop({ required: false })
  lastRatingUpdate: Date;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

const FidePlayerSchema = SchemaFactory.createForClass(FidePlayer);

// Pre-save hook to split 'name' into 'firstname' and 'lastname'
FidePlayerSchema.pre<FidePlayerDocument>('save', function (next) {
  if (this.isModified('name')) {
    const [last, first] = this.name.split(',').map((part) => part.trim());
    this.firstname = first;
    this.lastname = last;
  }
  next();
});

// Indexing
FidePlayerSchema.index({ firstname: 'text', lastname: 'text' });

// Create the SchemaFactory for the FIDE player schema
export { FidePlayerSchema };
