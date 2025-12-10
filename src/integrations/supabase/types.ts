export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_text: string
          city: string | null
          created_at: string
          district: string | null
          id: string
          is_default: boolean | null
          label: string
          pin: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address_text: string
          city?: string | null
          created_at?: string
          district?: string | null
          id?: string
          is_default?: boolean | null
          label: string
          pin?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address_text?: string
          city?: string | null
          created_at?: string
          district?: string | null
          id?: string
          is_default?: boolean | null
          label?: string
          pin?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          accepted_at: string | null
          booking_status: string
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          category_id: string
          category_name: string
          completed_at: string | null
          created_at: string
          duration_hours: number
          id: string
          job_address_id: string | null
          job_details: Json
          notes: string | null
          payment_status: string
          price: number
          service_date: string
          start_time: string
          started_at: string | null
          tip: number | null
          updated_at: string
          user_id: string
          worker_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          booking_status?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          category_id: string
          category_name: string
          completed_at?: string | null
          created_at?: string
          duration_hours: number
          id?: string
          job_address_id?: string | null
          job_details?: Json
          notes?: string | null
          payment_status?: string
          price: number
          service_date: string
          start_time: string
          started_at?: string | null
          tip?: number | null
          updated_at?: string
          user_id: string
          worker_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          booking_status?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          category_id?: string
          category_name?: string
          completed_at?: string | null
          created_at?: string
          duration_hours?: number
          id?: string
          job_address_id?: string | null
          job_details?: Json
          notes?: string | null
          payment_status?: string
          price?: number
          service_date?: string
          start_time?: string
          started_at?: string | null
          tip?: number | null
          updated_at?: string
          user_id?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_job_address_id_fkey"
            columns: ["job_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          base_rate: number | null
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          base_rate?: number | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          base_rate?: number | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      category_fields: {
        Row: {
          category_id: string
          config: Json | null
          created_at: string
          display_order: number | null
          field_label: string
          field_type: string
          id: string
          is_required: boolean | null
        }
        Insert: {
          category_id: string
          config?: Json | null
          created_at?: string
          display_order?: number | null
          field_label: string
          field_type: string
          id?: string
          is_required?: boolean | null
        }
        Update: {
          category_id?: string
          config?: Json | null
          created_at?: string
          display_order?: number | null
          field_label?: string
          field_type?: string
          id?: string
          is_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "category_fields_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string | null
          gateway_reference: string | null
          gateway_response: Json | null
          id: string
          metadata: Json | null
          payment_method: string
          refund_amount: number | null
          refund_reason: string | null
          refunded_at: string | null
          status: string
          updated_at: string
          user_id: string
          worker_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string | null
          gateway_reference?: string | null
          gateway_response?: Json | null
          id?: string
          metadata?: Json | null
          payment_method: string
          refund_amount?: number | null
          refund_reason?: string | null
          refunded_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
          worker_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string | null
          gateway_reference?: string | null
          gateway_response?: Json | null
          id?: string
          metadata?: Json | null
          payment_method?: string
          refund_amount?: number | null
          refund_reason?: string | null
          refunded_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          admin_notes: string | null
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          is_flagged: boolean | null
          is_public: boolean | null
          rating: number
          updated_at: string
          user_id: string
          worker_id: string
        }
        Insert: {
          admin_notes?: string | null
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          is_flagged?: boolean | null
          is_public?: boolean | null
          rating: number
          updated_at?: string
          user_id: string
          worker_id: string
        }
        Update: {
          admin_notes?: string | null
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          is_flagged?: boolean | null
          is_public?: boolean | null
          rating?: number
          updated_at?: string
          user_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          id: string
          last_active: string | null
          metadata: Json | null
          name: string
          phone: string
          profile_photo: string | null
          public_bio: string | null
          status: string
          updated_at: string
          wallet_balance: number | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_active?: string | null
          metadata?: Json | null
          name: string
          phone: string
          profile_photo?: string | null
          public_bio?: string | null
          status?: string
          updated_at?: string
          wallet_balance?: number | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_active?: string | null
          metadata?: Json | null
          name?: string
          phone?: string
          profile_photo?: string | null
          public_bio?: string | null
          status?: string
          updated_at?: string
          wallet_balance?: number | null
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          admin_notes: string | null
          back_image_url: string | null
          created_at: string
          document_number: string | null
          document_type: string
          document_url: string
          expiry_date: string | null
          front_image_url: string | null
          id: string
          metadata: Json | null
          rejection_reason: string | null
          updated_at: string
          verification_status: string
          verified_at: string | null
          verified_by: string | null
          worker_id: string
        }
        Insert: {
          admin_notes?: string | null
          back_image_url?: string | null
          created_at?: string
          document_number?: string | null
          document_type: string
          document_url: string
          expiry_date?: string | null
          front_image_url?: string | null
          id?: string
          metadata?: Json | null
          rejection_reason?: string | null
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
          worker_id: string
        }
        Update: {
          admin_notes?: string | null
          back_image_url?: string | null
          created_at?: string
          document_number?: string | null
          document_type?: string
          document_url?: string
          expiry_date?: string | null
          front_image_url?: string | null
          id?: string
          metadata?: Json | null
          rejection_reason?: string | null
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_categories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_primary: boolean | null
          rate_override: number | null
          worker_id: string
          years_experience: number | null
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          rate_override?: number | null
          worker_id: string
          years_experience?: number | null
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          rate_override?: number | null
          worker_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_categories_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      workers: {
        Row: {
          auth_user_id: string | null
          average_rating: number | null
          bio: string | null
          created_at: string
          day_rate: number | null
          email: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          is_available: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          last_active: string | null
          metadata: Json | null
          name: string
          phone: string
          profile_photo: string | null
          rating_count: number | null
          skills: string[] | null
          status: string
          total_jobs_completed: number | null
          updated_at: string
          verification_status: string | null
          verified_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          day_rate?: number | null
          email?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_active?: string | null
          metadata?: Json | null
          name: string
          phone: string
          profile_photo?: string | null
          rating_count?: number | null
          skills?: string[] | null
          status?: string
          total_jobs_completed?: number | null
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          day_rate?: number | null
          email?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_available?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_active?: string | null
          metadata?: Json | null
          name?: string
          phone?: string
          profile_photo?: string | null
          rating_count?: number | null
          skills?: string[] | null
          status?: string
          total_jobs_completed?: number | null
          updated_at?: string
          verification_status?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
