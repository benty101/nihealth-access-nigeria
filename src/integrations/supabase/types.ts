export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      biobank_samples: {
        Row: {
          chain_of_custody: Json | null
          collection_date: string
          collection_method: string
          consent_biobanking: boolean | null
          consent_data_sharing: boolean | null
          consent_research: boolean | null
          created_at: string | null
          id: string
          lab_id: string | null
          processing_status: string | null
          quality_metrics: Json | null
          sample_id: string
          sample_type: string
          storage_location: string | null
          storage_temperature: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chain_of_custody?: Json | null
          collection_date: string
          collection_method: string
          consent_biobanking?: boolean | null
          consent_data_sharing?: boolean | null
          consent_research?: boolean | null
          created_at?: string | null
          id?: string
          lab_id?: string | null
          processing_status?: string | null
          quality_metrics?: Json | null
          sample_id: string
          sample_type: string
          storage_location?: string | null
          storage_temperature?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chain_of_custody?: Json | null
          collection_date?: string
          collection_method?: string
          consent_biobanking?: boolean | null
          consent_data_sharing?: boolean | null
          consent_research?: boolean | null
          created_at?: string | null
          id?: string
          lab_id?: string | null
          processing_status?: string | null
          quality_metrics?: Json | null
          sample_id?: string
          sample_type?: string
          storage_location?: string | null
          storage_temperature?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biobank_samples_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          chief_complaint: string | null
          consultation_fee: number
          consultation_notes: string | null
          consultation_number: string
          consultation_type: string
          created_at: string | null
          diagnosis: string | null
          doctor_id: string
          duration_minutes: number | null
          ended_at: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          hospital_id: string | null
          id: string
          patient_id: string
          patient_satisfaction_rating: number | null
          payment_status: string | null
          prescription_notes: string | null
          scheduled_at: string
          started_at: string | null
          status: string
          symptoms: string | null
          treatment_plan: string | null
          updated_at: string | null
        }
        Insert: {
          chief_complaint?: string | null
          consultation_fee: number
          consultation_notes?: string | null
          consultation_number: string
          consultation_type?: string
          created_at?: string | null
          diagnosis?: string | null
          doctor_id: string
          duration_minutes?: number | null
          ended_at?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          hospital_id?: string | null
          id?: string
          patient_id: string
          patient_satisfaction_rating?: number | null
          payment_status?: string | null
          prescription_notes?: string | null
          scheduled_at: string
          started_at?: string | null
          status?: string
          symptoms?: string | null
          treatment_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          chief_complaint?: string | null
          consultation_fee?: number
          consultation_notes?: string | null
          consultation_number?: string
          consultation_type?: string
          created_at?: string | null
          diagnosis?: string | null
          doctor_id?: string
          duration_minutes?: number | null
          ended_at?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          hospital_id?: string | null
          id?: string
          patient_id?: string
          patient_satisfaction_rating?: number | null
          payment_status?: string | null
          prescription_notes?: string | null
          scheduled_at?: string
          started_at?: string | null
          status?: string
          symptoms?: string | null
          treatment_plan?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "telemedicine_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_availability: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          created_at: string | null
          day_of_week: number
          doctor_id: string
          end_time: string
          hospital_id: string | null
          id: string
          is_available: boolean | null
          max_patients_per_slot: number | null
          slot_duration_minutes: number | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string | null
          day_of_week: number
          doctor_id: string
          end_time: string
          hospital_id?: string | null
          id?: string
          is_available?: boolean | null
          max_patients_per_slot?: number | null
          slot_duration_minutes?: number | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          created_at?: string | null
          day_of_week?: number
          doctor_id?: string
          end_time?: string
          hospital_id?: string | null
          id?: string
          is_available?: boolean | null
          max_patients_per_slot?: number | null
          slot_duration_minutes?: number | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "telemedicine_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_availability_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      family_connections: {
        Row: {
          connected_user_id: string | null
          connection_status: string
          created_at: string
          id: string
          invited_email: string | null
          mutual_sharing: boolean
          relationship: string
          updated_at: string
          user_id: string
        }
        Insert: {
          connected_user_id?: string | null
          connection_status?: string
          created_at?: string
          id?: string
          invited_email?: string | null
          mutual_sharing?: boolean
          relationship: string
          updated_at?: string
          user_id: string
        }
        Update: {
          connected_user_id?: string | null
          connection_status?: string
          created_at?: string
          id?: string
          invited_email?: string | null
          mutual_sharing?: boolean
          relationship?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      family_health_records: {
        Row: {
          age_at_death: number | null
          allergies: string[] | null
          birth_date: string | null
          cause_of_death: string | null
          consent_to_share: boolean | null
          created_at: string | null
          family_member_name: string
          gender: string | null
          genetic_conditions: string[] | null
          id: string
          medical_conditions: string[] | null
          medications: string[] | null
          relationship: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age_at_death?: number | null
          allergies?: string[] | null
          birth_date?: string | null
          cause_of_death?: string | null
          consent_to_share?: boolean | null
          created_at?: string | null
          family_member_name: string
          gender?: string | null
          genetic_conditions?: string[] | null
          id?: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          relationship: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age_at_death?: number | null
          allergies?: string[] | null
          birth_date?: string | null
          cause_of_death?: string | null
          consent_to_share?: boolean | null
          created_at?: string | null
          family_member_name?: string
          gender?: string | null
          genetic_conditions?: string[] | null
          id?: string
          medical_conditions?: string[] | null
          medications?: string[] | null
          relationship?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      family_health_shares: {
        Row: {
          created_at: string
          expires_at: string | null
          health_data_type: string
          id: string
          permission_level: string
          related_id: string | null
          shared_with_user_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          health_data_type: string
          id?: string
          permission_level?: string
          related_id?: string | null
          shared_with_user_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          health_data_type?: string
          id?: string
          permission_level?: string
          related_id?: string | null
          shared_with_user_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_timeline_events: {
        Row: {
          created_at: string | null
          event_date: string
          event_description: string | null
          event_title: string
          event_type: string
          id: string
          is_milestone: boolean | null
          metadata: Json | null
          privacy_level: string | null
          related_id: string | null
          related_table: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_date: string
          event_description?: string | null
          event_title: string
          event_type: string
          id?: string
          is_milestone?: boolean | null
          metadata?: Json | null
          privacy_level?: string | null
          related_id?: string | null
          related_table?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_date?: string
          event_description?: string | null
          event_title?: string
          event_type?: string
          id?: string
          is_milestone?: boolean | null
          metadata?: Json | null
          privacy_level?: string | null
          related_id?: string | null
          related_table?: string | null
          user_id?: string
        }
        Relationships: []
      }
      home_test_kits: {
        Row: {
          collection_instructions: string | null
          created_at: string | null
          id: string
          kit_name: string
          kit_type: string
          lab_id: string | null
          order_number: string
          price: number
          results_available: boolean | null
          results_url: string | null
          return_shipping_label: string | null
          shipping_address: string
          status: string | null
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          collection_instructions?: string | null
          created_at?: string | null
          id?: string
          kit_name: string
          kit_type: string
          lab_id?: string | null
          order_number: string
          price: number
          results_available?: boolean | null
          results_url?: string | null
          return_shipping_label?: string | null
          shipping_address: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          collection_instructions?: string | null
          created_at?: string | null
          id?: string
          kit_name?: string
          kit_type?: string
          lab_id?: string | null
          order_number?: string
          price?: number
          results_available?: boolean | null
          results_url?: string | null
          return_shipping_label?: string | null
          shipping_address?: string
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "home_test_kits_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_doctors: {
        Row: {
          created_at: string | null
          department: string | null
          doctor_id: string
          employment_type: string | null
          hospital_id: string
          id: string
          is_active: boolean | null
          joined_date: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          doctor_id: string
          employment_type?: string | null
          hospital_id: string
          id?: string
          is_active?: boolean | null
          joined_date?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          doctor_id?: string
          employment_type?: string | null
          hospital_id?: string
          id?: string
          is_active?: boolean | null
          joined_date?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_doctors_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "telemedicine_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
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
      insurance_api_configs: {
        Row: {
          api_endpoint: string
          api_key_reference: string | null
          config_data: Json | null
          created_at: string
          id: string
          is_active: boolean | null
          last_sync: string | null
          provider_name: string
          updated_at: string
        }
        Insert: {
          api_endpoint: string
          api_key_reference?: string | null
          config_data?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          provider_name: string
          updated_at?: string
        }
        Update: {
          api_endpoint?: string
          api_key_reference?: string | null
          config_data?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync?: string | null
          provider_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_claims: {
        Row: {
          claim_amount: number
          claim_number: string
          claim_type: string
          created_at: string
          description: string | null
          hospital_id: string | null
          id: string
          purchase_id: string
          status: string
          supporting_documents: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          claim_amount: number
          claim_number: string
          claim_type: string
          created_at?: string
          description?: string | null
          hospital_id?: string | null
          id?: string
          purchase_id: string
          status?: string
          supporting_documents?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          claim_amount?: number
          claim_number?: string
          claim_type?: string
          created_at?: string
          description?: string | null
          hospital_id?: string | null
          id?: string
          purchase_id?: string
          status?: string
          supporting_documents?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_claims_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_claims_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "insurance_purchases"
            referencedColumns: ["id"]
          },
        ]
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
      insurance_purchases: {
        Row: {
          beneficiaries: Json | null
          created_at: string
          end_date: string
          id: string
          payment_frequency: string
          plan_id: string
          policy_number: string | null
          premium_amount: number
          purchase_date: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          beneficiaries?: Json | null
          created_at?: string
          end_date: string
          id?: string
          payment_frequency?: string
          plan_id: string
          policy_number?: string | null
          premium_amount: number
          purchase_date?: string
          start_date: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          beneficiaries?: Json | null
          created_at?: string
          end_date?: string
          id?: string
          payment_frequency?: string
          plan_id?: string
          policy_number?: string | null
          premium_amount?: number
          purchase_date?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_purchases_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "insurance_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_test_order_items: {
        Row: {
          created_at: string | null
          id: string
          lab_test_id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          lab_test_id: string
          order_id: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          lab_test_id?: string
          order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_order_items_lab_test_id_fkey"
            columns: ["lab_test_id"]
            isOneToOne: false
            referencedRelation: "lab_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_test_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lab_test_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_test_order_status_history: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          status: string
          status_message: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          status: string
          status_message?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          status?: string
          status_message?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "lab_test_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_test_orders: {
        Row: {
          collection_address: string | null
          collection_date: string | null
          collection_method: string
          collection_phone: string
          collection_time: string | null
          created_at: string | null
          id: string
          lab_id: string | null
          order_number: string
          patient_age: number | null
          patient_gender: string | null
          patient_name: string
          payment_method: string | null
          payment_status: string | null
          results_uploaded: boolean | null
          results_url: string | null
          special_instructions: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          collection_address?: string | null
          collection_date?: string | null
          collection_method?: string
          collection_phone: string
          collection_time?: string | null
          created_at?: string | null
          id?: string
          lab_id?: string | null
          order_number: string
          patient_age?: number | null
          patient_gender?: string | null
          patient_name: string
          payment_method?: string | null
          payment_status?: string | null
          results_uploaded?: boolean | null
          results_url?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          collection_address?: string | null
          collection_date?: string | null
          collection_method?: string
          collection_phone?: string
          collection_time?: string | null
          created_at?: string | null
          id?: string
          lab_id?: string | null
          order_number?: string
          patient_age?: number | null
          patient_gender?: string | null
          patient_name?: string
          payment_method?: string | null
          payment_status?: string | null
          results_uploaded?: boolean | null
          results_url?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_orders_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_fasting_required: boolean | null
          lab_id: string | null
          name: string
          normal_range: string | null
          preparation_required: string | null
          price: number
          sample_type: string | null
          test_code: string | null
          turnaround_time: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_fasting_required?: boolean | null
          lab_id?: string | null
          name: string
          normal_range?: string | null
          preparation_required?: string | null
          price: number
          sample_type?: string | null
          test_code?: string | null
          turnaround_time?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_fasting_required?: boolean | null
          lab_id?: string | null
          name?: string
          normal_range?: string | null
          preparation_required?: string | null
          price?: number
          sample_type?: string | null
          test_code?: string | null
          turnaround_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
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
      medication_order_items: {
        Row: {
          created_at: string | null
          id: string
          medication_id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          medication_id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          medication_id?: string
          order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "medication_order_items_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "medication_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_orders: {
        Row: {
          actual_delivery_date: string | null
          created_at: string | null
          delivery_address: string
          delivery_method: string | null
          delivery_phone: string
          estimated_delivery_date: string | null
          id: string
          order_number: string
          payment_method: string | null
          payment_status: string | null
          pharmacy_id: string | null
          prescription_uploaded: boolean | null
          prescription_url: string | null
          special_instructions: string | null
          status: string
          total_amount: number
          tracking_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_delivery_date?: string | null
          created_at?: string | null
          delivery_address: string
          delivery_method?: string | null
          delivery_phone: string
          estimated_delivery_date?: string | null
          id?: string
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          pharmacy_id?: string | null
          prescription_uploaded?: boolean | null
          prescription_url?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_delivery_date?: string | null
          created_at?: string | null
          delivery_address?: string
          delivery_method?: string | null
          delivery_phone?: string
          estimated_delivery_date?: string | null
          id?: string
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          pharmacy_id?: string | null
          prescription_uploaded?: boolean | null
          prescription_url?: string | null
          special_instructions?: string | null
          status?: string
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_orders_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_reminders: {
        Row: {
          created_at: string | null
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          medication_id: string | null
          medication_name: string
          notes: string | null
          reminder_enabled: boolean | null
          start_date: string
          time_of_day: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          medication_id?: string | null
          medication_name: string
          notes?: string | null
          reminder_enabled?: boolean | null
          start_date: string
          time_of_day?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          medication_id?: string | null
          medication_name?: string
          notes?: string | null
          reminder_enabled?: boolean | null
          start_date?: string
          time_of_day?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_reminders_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          active_ingredient: string | null
          age_restrictions: string | null
          batch_number: string | null
          brand: string | null
          category: string
          contraindications: string[] | null
          created_at: string | null
          description: string | null
          dosage: string | null
          drug_interactions: string[] | null
          expiry_date: string | null
          generic_name: string | null
          id: string
          in_stock: boolean | null
          indication: string | null
          is_active: boolean | null
          manufacturer: string | null
          name: string
          pack_size: string | null
          pharmacy_id: string | null
          pregnancy_category: string | null
          prescription_notes: string | null
          prescription_required: boolean | null
          price: number
          rating: number | null
          requires_cold_storage: boolean | null
          route_of_administration: string | null
          side_effects: string[] | null
          storage_instructions: string | null
          strength: string | null
          therapeutic_class: string | null
          updated_at: string | null
          warnings: string[] | null
        }
        Insert: {
          active_ingredient?: string | null
          age_restrictions?: string | null
          batch_number?: string | null
          brand?: string | null
          category: string
          contraindications?: string[] | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          drug_interactions?: string[] | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          in_stock?: boolean | null
          indication?: string | null
          is_active?: boolean | null
          manufacturer?: string | null
          name: string
          pack_size?: string | null
          pharmacy_id?: string | null
          pregnancy_category?: string | null
          prescription_notes?: string | null
          prescription_required?: boolean | null
          price: number
          rating?: number | null
          requires_cold_storage?: boolean | null
          route_of_administration?: string | null
          side_effects?: string[] | null
          storage_instructions?: string | null
          strength?: string | null
          therapeutic_class?: string | null
          updated_at?: string | null
          warnings?: string[] | null
        }
        Update: {
          active_ingredient?: string | null
          age_restrictions?: string | null
          batch_number?: string | null
          brand?: string | null
          category?: string
          contraindications?: string[] | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          drug_interactions?: string[] | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          in_stock?: boolean | null
          indication?: string | null
          is_active?: boolean | null
          manufacturer?: string | null
          name?: string
          pack_size?: string | null
          pharmacy_id?: string | null
          pregnancy_category?: string | null
          prescription_notes?: string | null
          prescription_required?: boolean | null
          price?: number
          rating?: number | null
          requires_cold_storage?: boolean | null
          route_of_administration?: string | null
          side_effects?: string[] | null
          storage_instructions?: string | null
          strength?: string | null
          therapeutic_class?: string | null
          updated_at?: string | null
          warnings?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "medications_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            isOneToOne: false
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          related_type?: string | null
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_status_history: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          status: string
          status_message: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          status: string
          status_message?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          status?: string
          status_message?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "medication_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_records: {
        Row: {
          admission_date: string | null
          admission_type: string | null
          allergies: string | null
          attending_doctor_id: string | null
          bed_number: string | null
          chief_complaint: string | null
          created_at: string | null
          current_medications: string | null
          department: string | null
          diagnosis: string | null
          discharge_date: string | null
          discharge_summary: string | null
          follow_up_instructions: string | null
          hospital_id: string
          id: string
          medical_history: string | null
          patient_id: string
          record_number: string
          room_number: string | null
          status: string | null
          treatment_plan: string | null
          updated_at: string | null
          vital_signs: Json | null
        }
        Insert: {
          admission_date?: string | null
          admission_type?: string | null
          allergies?: string | null
          attending_doctor_id?: string | null
          bed_number?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          current_medications?: string | null
          department?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          discharge_summary?: string | null
          follow_up_instructions?: string | null
          hospital_id: string
          id?: string
          medical_history?: string | null
          patient_id: string
          record_number: string
          room_number?: string | null
          status?: string | null
          treatment_plan?: string | null
          updated_at?: string | null
          vital_signs?: Json | null
        }
        Update: {
          admission_date?: string | null
          admission_type?: string | null
          allergies?: string | null
          attending_doctor_id?: string | null
          bed_number?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          current_medications?: string | null
          department?: string | null
          diagnosis?: string | null
          discharge_date?: string | null
          discharge_summary?: string | null
          follow_up_instructions?: string | null
          hospital_id?: string
          id?: string
          medical_history?: string | null
          patient_id?: string
          record_number?: string
          room_number?: string | null
          status?: string | null
          treatment_plan?: string | null
          updated_at?: string | null
          vital_signs?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_records_attending_doctor_id_fkey"
            columns: ["attending_doctor_id"]
            isOneToOne: false
            referencedRelation: "telemedicine_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_records_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
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
      prescription_uploads: {
        Row: {
          created_at: string | null
          doctor_license: string | null
          doctor_name: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          order_id: string | null
          pharmacist_notes: string | null
          prescription_date: string | null
          status: string | null
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          doctor_license?: string | null
          doctor_name?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          order_id?: string | null
          pharmacist_notes?: string | null
          prescription_date?: string | null
          status?: string | null
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          doctor_license?: string | null
          doctor_name?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          order_id?: string | null
          pharmacist_notes?: string | null
          prescription_date?: string | null
          status?: string | null
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_uploads_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "medication_orders"
            referencedColumns: ["id"]
          },
        ]
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
          height: number | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          is_pregnant: boolean | null
          lga: string | null
          phone_number: string | null
          preferred_language: string | null
          state_of_residence: string | null
          updated_at: string | null
          weight: number | null
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
          height?: number | null
          id: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_pregnant?: boolean | null
          lga?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          state_of_residence?: string | null
          updated_at?: string | null
          weight?: number | null
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
          height?: number | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_pregnant?: boolean | null
          lga?: string | null
          phone_number?: string | null
          preferred_language?: string | null
          state_of_residence?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
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
      user_consents: {
        Row: {
          consent_date: string
          consent_given: boolean
          consent_type: string
          consent_version: string
          created_at: string | null
          id: string
          metadata: Json | null
          updated_at: string | null
          user_id: string
          withdrawal_date: string | null
        }
        Insert: {
          consent_date: string
          consent_given: boolean
          consent_type: string
          consent_version: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id: string
          withdrawal_date?: string | null
        }
        Update: {
          consent_date?: string
          consent_given?: boolean
          consent_type?: string
          consent_version?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string
          withdrawal_date?: string | null
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
      generate_consultation_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_kit_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_lab_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_patient_record_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_policy_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_sample_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_system_stats_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: Json
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
      is_hospital_admin_for: {
        Args: { _user_id: string; _hospital_id: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_security_event: {
        Args: { event_type: string; user_id?: string; details?: Json }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "super_admin" | "hospital_admin" | "patient" | "broker"
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
    Enums: {
      user_role: ["super_admin", "hospital_admin", "patient", "broker"],
    },
  },
} as const
