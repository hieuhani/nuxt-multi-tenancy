export type Job = {
  title: string;
  slug: string;
  link: string;
  description: string;
  locations: Array<{
    name: string;
    city: string;
    state: {
      code: string;
      name: string;
    };
    country: {
      code: string;
      name: string;
    };
  }>;
  remote: {
    type: "HYBRID" | "ONLY" | null;
    timezones: Array<{ tz: string; offset: number }>;
  };
  work_permit: Array<string>;
  organization: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  salary: {
    interval: "MONTH" | "HOUR" | "YEAR";
    from: number | null;
    to: number | null;
    currency: string;
  };
  taxonomies: {
    work_type: Array<string>;
    work_level: Array<string>;
  };
  published_at: string;
  options: {
    base: boolean;
  };
};

export type JobDetail = {
  id: number;
  title: string;
  slug: string;
  link: string;
  description: string;
  short_description: string;
  locations: Array<{
    city: string;
    name: string;
    coords: {
      lat: number;
      lng: number;
    };
    country: {
      code: string;
      name: string;
    };
    placeId: string;
    province: {
      code: string;
      name: string;
    };
  }>;
  remote: {
    type: string;
    timezones: Array<any>;
  };
  work_permit: Array<string>;
  apply_target: string;
  how_to_apply: string;
  salary: {
    interval: string;
    from: number;
    to: number;
    currency: string;
  };
  organization: {
    id: number;
    name: string;
    slug: string;
    tagline: any;
    description: any;
    verified: boolean;
    avatar: string;
    locations: Array<{
      name: string;
      coords: {
        lat: number;
        lng: number;
      };
      country: {
        code: string;
        name: string;
      };
      placeId: string;
      province: any;
      city?: string;
    }>;
    links: {
      website: string;
    };
  };
  taxonomies: {
    work_type: Array<{
      id: number;
      name: string;
    }>;
    work_level: Array<{
      id: number;
      name: string;
    }>;
  };
  meta: {
    og_image: string;
  };
  status: string;
  options: {
    base: boolean;
  };
  published_at: string;
  expired_at: string;
  created_at: string;
  updated_at: string;
};
