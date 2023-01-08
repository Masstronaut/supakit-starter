export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      AccountSettings: {
        Row: {
          userId: string
          theme: string
        }
        Insert: {
          userId: string
          theme: string
        }
        Update: {
          userId?: string
          theme?: string
        }
      }
      User: {
        Row: {
          id: string
          username: string
          photo: string
          role: Database["public"]["Enums"]["role"]
          createdAt: string
        }
        Insert: {
          id: string
          username: string
          photo: string
          role?: Database["public"]["Enums"]["role"]
          createdAt: string
        }
        Update: {
          id?: string
          username?: string
          photo?: string
          role?: Database["public"]["Enums"]["role"]
          createdAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "admin" | "user"
    }
  }
}
