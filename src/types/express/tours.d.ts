export default interface TourInterface {
  name?: string;
  duration?: number | string | { string: string };
  maxGroupSize?: number | string | { string: string };
  difficulty?: string;
  ratingsAverage?: number | string | { string: string };
  ratingsQuantity?: number | string;
  price?: number | string | { string: string };
  summary?: string;
  description?: string;
  imageCover?: string;
  images?: string[];
}