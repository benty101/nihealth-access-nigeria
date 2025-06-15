export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      hospital_staff: {
        Row: {
          created_at: string | null
          hospital_id: string
          id: string
          is_active: boolean | null
          position: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          hospital_id: string
          id?: string
          is_active?: boolean | null
          position?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          hospital_id?: string
          id?: string
          is_active?: boolean | null
          position?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_staff_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          facilities: string[] | null
          id: string
          is_active: boolean | null
          lga: string | null
          license_number: string | null
          name: string
          phone: string | null
          specialties: string[] | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          facilities?: string[] | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name: string
          phone?: string | null
          specialties?: string[] | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          facilities?: string[] | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name?: string
          phone?: string | null
          specialties?: string[] | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      insurance_plans: {
        Row: {
          coverage_amount: number | null
          created_at: string | null
          features: string[] | null
          id: string
          is_active: boolean | null
          name: string
          plan_type: string
          premium_annual: number | null
          premium_monthly: number | null
          provider: string
          terms: string | null
          updated_at: string | null
        }
        Insert: {
          coverage_amount?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          plan_type: string
          premium_annual?: number | null
          premium_monthly?: number | null
          provider: string
          terms?: string | null
          updated_at?: string | null
        }
        Update: {
          coverage_amount?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          plan_type?: string
          premium_annual?: number | null
          premium_monthly?: number | null
          provider?: string
          terms?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      labs: {
        Row: {
          address: string | null
          certifications: string[] | null
          created_at: string | null
          email: string | null
          equipment: string[] | null
          id: string
          is_active: boolean | null
          lga: string | null
          license_number: string | null
          name: string
          operating_hours: Json | null
          phone: string | null
          state: string | null
          test_types: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string | null
          email?: string | null
          equipment?: string[] | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name: string
          operating_hours?: Json | null
          phone?: string | null
          state?: string | null
          test_types?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string | null
          email?: string | null
          equipment?: string[] | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          state?: string | null
          test_types?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          created_at: string | null
          date_created: string
          description: string | null
          doctor_name: string | null
          file_size: number | null
          file_url: string | null
          healthcare_provider: string | null
          id: string
          is_shared: boolean | null
          mime_type: string | null
          record_type: string
          shared_with: string[] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_created: string
          description?: string | null
          doctor_name?: string | null
          file_size?: number | null
          file_url?: string | null
          healthcare_provider?: string | null
          id?: string
          is_shared?: boolean | null
          mime_type?: string | null
          record_type: string
          shared_with?: string[] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_created?: string
          description?: string | null
          doctor_name?: string | null
          file_size?: number | null
          file_url?: string | null
          healthcare_provider?: string | null
          id?: string
          is_shared?: boolean | null
          mime_type?: string | null
          record_type?: string
          shared_with?: string[] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          lga: string | null
          license_number: string | null
          name: string
          operating_hours: Json | null
          phone: string | null
          services: string[] | null
          specialties: string[] | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name: string
          operating_hours?: Json | null
          phone?: string | null
          services?: string[] | null
          specialties?: string[] | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          lga?: string | null
          license_number?: string | null
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          services?: string[] | null
          specialties?: string[] | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          allergies: string[] | null
          blood_group: string | null
          chronic_conditions: string[] | null
          created_at: string | null
          date_of_birth: string | null
          due_date: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          gender: string | null
          genotype: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          is_pregnant: boolean | null
          lga: string | null
          phone_number: string | null
          preferred_language: string | null
          state_of_residence: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          blood_group?: string | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          due_date?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          genotype?: string | null
          id: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_pregnant?: boolean | null
          lga?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          state_of_residence?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          blood_group?: string | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          due_date?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: string | null
          genotype?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_pregnant?: boolean | null
          lga?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          state_of_residence?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      telemedicine_providers: {
        Row: {
          available_hours: Json | null
          consultation_fee: number | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: string
          is_active: boolean | null
          languages: string[] | null
          license_number: string | null
          name: string
          phone: string | null
          rating: number | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          available_hours?: Json | null
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          license_number?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          available_hours?: Json | null
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          license_number?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manage_roles: {
        Args: { _user_id: string }
        Returns: boolean
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_current_user_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_super_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "super_admin" | "hospital_admin" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["super_admin", "hospital_admin", "patient"],
    },
  },
} as const
