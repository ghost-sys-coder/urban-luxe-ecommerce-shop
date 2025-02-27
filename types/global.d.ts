export {}

// Create a type for the roles
export type Roles = 'admin' | 'client'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}


export interface Category {
  id: string;
  category: string;
  slug?: string;
  created_by: string;
  image_url?: string;
}

export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  category: string;
  updated_at: string;
  is_active?: boolean;
  is_featured?: boolean;
  rating?: boolean;
  stock_units?: number;
  units_sold?: number;
  size?: string;
  color?: string;
  brand?: string;
  productImages?: ProductsImage[];
}

export interface ProductsImage {
  id: string;
  created_at: string;
  url: string;
  product_id: string;
}


export interface Areas {
  id: string;
  created_at: string;
  district_id: string;
  area: string;
}


export interface District {
  id: string;
  created_at: string;
  district: string;
}