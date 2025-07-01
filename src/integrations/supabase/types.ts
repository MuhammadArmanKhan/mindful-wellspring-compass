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
      admin_comments: {
        Row: {
          admin_id: string
          comment: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          admin_id: string
          comment: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          admin_id?: string
          comment?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          id: string
          message: string | null
          reason: Database["public"]["Enums"]["alert_reason"]
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          triggered_at: string
          user_id: string
        }
        Insert: {
          id?: string
          message?: string | null
          reason: Database["public"]["Enums"]["alert_reason"]
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          triggered_at?: string
          user_id: string
        }
        Update: {
          id?: string
          message?: string | null
          reason?: Database["public"]["Enums"]["alert_reason"]
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          triggered_at?: string
          user_id?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          completed_at: string
          duration_minutes: number | null
          id: string
          notes: string | null
          type: Database["public"]["Enums"]["exercise_type"]
          user_id: string
        }
        Insert: {
          completed_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          type: Database["public"]["Enums"]["exercise_type"]
          user_id: string
        }
        Update: {
          completed_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          type?: Database["public"]["Enums"]["exercise_type"]
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          app_helpfulness: number
          comments: string | null
          created_at: string
          feature_satisfaction: number
          id: string
          overall_rating: number
          user_id: string
          week_start_date: string
        }
        Insert: {
          app_helpfulness: number
          comments?: string | null
          created_at?: string
          feature_satisfaction: number
          id?: string
          overall_rating: number
          user_id: string
          week_start_date: string
        }
        Update: {
          app_helpfulness?: number
          comments?: string | null
          created_at?: string
          feature_satisfaction?: number
          id?: string
          overall_rating?: number
          user_id?: string
          week_start_date?: string
        }
        Relationships: []
      }
      moods: {
        Row: {
          created_at: string
          id: string
          mood_score: number
          note: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_score: number
          note?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_score?: number
          note?: string | null
          user_id?: string
        }
        Relationships: []
      }
      motivational_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          language: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          language: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          language?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      safety_plans: {
        Row: {
          content: string
          created_by: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_by: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_by?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_message: {
        Args: { user_language?: string }
        Returns: {
          id: string
          title: string
          content: string
          language: string
        }[]
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_weekly_summary: {
        Args: { user_uuid: string; week_start?: string }
        Returns: Json
      }
      is_admin_or_support: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      alert_reason: "emergency_button" | "inactivity" | "mood_trigger"
      exercise_type: "breathing" | "journaling" | "reflection"
      user_role: "user" | "admin" | "support"
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
      alert_reason: ["emergency_button", "inactivity", "mood_trigger"],
      exercise_type: ["breathing", "journaling", "reflection"],
      user_role: ["user", "admin", "support"],
    },
  },
} as const
