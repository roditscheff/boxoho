export type MapPointType = "artwork" | "postcard";

export type PublicMapPoint = {
  id: string;
  type: MapPointType;
  firstName: string;
  lat: number;
  lng: number;
  imageUrl: string | null;
};

export type ArtworkLookup = {
  id: string;
  number: string;
  title: string | null;
  imageUrl: string;
  alreadyRegistered: boolean;
};
