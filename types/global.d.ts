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