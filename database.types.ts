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
      campaign_requests: {
        Row: {
          campaign_invite_code: string
          created_at: string
          id: number
          pc_user_id: string
          status: number
        }
        Insert: {
          campaign_invite_code?: string
          created_at?: string
          id?: number
          pc_user_id: string
          status?: number
        }
        Update: {
          campaign_invite_code?: string
          created_at?: string
          id?: number
          pc_user_id?: string
          status?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaign_requests_campaign_invite_code_fkey"
            columns: ["campaign_invite_code"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["invite_code"]
          },
          {
            foreignKeyName: "campaign_requests_pc_user_id_fkey"
            columns: ["pc_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_users: {
        Row: {
          campaign_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          campaign_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          campaign_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_users_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          campaign_name: string
          created_at: string
          id: number
          invite_code: string
          owner: string
          world: string
        }
        Insert: {
          campaign_name?: string
          created_at?: string
          id?: number
          invite_code?: string
          owner?: string
          world?: string
        }
        Update: {
          campaign_name?: string
          created_at?: string
          id?: number
          invite_code?: string
          owner?: string
          world?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      character_abilities: {
        Row: {
          campaign_id: number | null
          character_id: number
          charisma: number
          constitution: number
          created_at: string
          dexterity: number
          id: number
          intelligence: number
          strength: number
          wisdom: number
        }
        Insert: {
          campaign_id?: number | null
          character_id: number
          charisma?: number
          constitution?: number
          created_at?: string
          dexterity?: number
          id?: number
          intelligence?: number
          strength?: number
          wisdom?: number
        }
        Update: {
          campaign_id?: number | null
          character_id?: number
          charisma?: number
          constitution?: number
          created_at?: string
          dexterity?: number
          id?: number
          intelligence?: number
          strength?: number
          wisdom?: number
        }
        Relationships: [
          {
            foreignKeyName: "abilities_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abilities_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_attacks_and_spellcasting: {
        Row: {
          atk_ability: string
          atk_crit_range: number
          atk_flat_bonus: number
          atk_magic_bonus: number
          atk_range: string
          campaign_id: number
          character_id: number
          created_at: string
          description: string
          dmg_crit_dice_count: number
          dmg_crit_dice_type: number
          dmg_dice_count: number
          dmg_dice_type: number
          dmg_type: string
          id: number
          is_proficient: boolean
          item_name: string
          saving_throw_ability: string
          saving_throw_vs_dc_ability: string
        }
        Insert: {
          atk_ability?: string
          atk_crit_range?: number
          atk_flat_bonus?: number
          atk_magic_bonus?: number
          atk_range?: string
          campaign_id: number
          character_id: number
          created_at?: string
          description?: string
          dmg_crit_dice_count?: number
          dmg_crit_dice_type?: number
          dmg_dice_count?: number
          dmg_dice_type?: number
          dmg_type?: string
          id?: number
          is_proficient?: boolean
          item_name?: string
          saving_throw_ability?: string
          saving_throw_vs_dc_ability?: string
        }
        Update: {
          atk_ability?: string
          atk_crit_range?: number
          atk_flat_bonus?: number
          atk_magic_bonus?: number
          atk_range?: string
          campaign_id?: number
          character_id?: number
          created_at?: string
          description?: string
          dmg_crit_dice_count?: number
          dmg_crit_dice_type?: number
          dmg_dice_count?: number
          dmg_dice_type?: number
          dmg_type?: string
          id?: number
          is_proficient?: boolean
          item_name?: string
          saving_throw_ability?: string
          saving_throw_vs_dc_ability?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_attacks_and_spellcasting_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_attacks_and_spellcasting_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_death_saves: {
        Row: {
          campaign_id: number
          character_id: number
          created_at: string
          failures: number
          id: number
          sucesses: number
        }
        Insert: {
          campaign_id: number
          character_id: number
          created_at?: string
          failures?: number
          id?: number
          sucesses?: number
        }
        Update: {
          campaign_id?: number
          character_id?: number
          created_at?: string
          failures?: number
          id?: number
          sucesses?: number
        }
        Relationships: [
          {
            foreignKeyName: "death_saves_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "death_saves_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_inventory: {
        Row: {
          campaign_id: number
          character_id: number
          count: number
          created_at: string
          id: number
          is_equiped: boolean
          item_name: string
          notes: string
          weight: number
        }
        Insert: {
          campaign_id: number
          character_id: number
          count?: number
          created_at?: string
          id?: number
          is_equiped?: boolean
          item_name?: string
          notes?: string
          weight?: number
        }
        Update: {
          campaign_id?: number
          character_id?: number
          count?: number
          created_at?: string
          id?: number
          is_equiped?: boolean
          item_name?: string
          notes?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "character_inventory_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_inventory_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_saving_throws_proficiencies: {
        Row: {
          campaign_id: number
          character_id: number
          charisma: number
          constitution: number
          created_at: string
          dexterity: number
          id: number
          intelligence: number
          strength: number
          wisdom: number
        }
        Insert: {
          campaign_id: number
          character_id: number
          charisma?: number
          constitution?: number
          created_at?: string
          dexterity?: number
          id?: number
          intelligence?: number
          strength?: number
          wisdom?: number
        }
        Update: {
          campaign_id?: number
          character_id?: number
          charisma?: number
          constitution?: number
          created_at?: string
          dexterity?: number
          id?: number
          intelligence?: number
          strength?: number
          wisdom?: number
        }
        Relationships: [
          {
            foreignKeyName: "saving_throws_proficiencies_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saving_throws_proficiencies_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_skill_proficiencies: {
        Row: {
          acrobatics: number
          animal_handling: number
          arcana: number
          athletics: number
          campaign_id: number
          character_id: number
          created_at: string
          deception: number
          history: number
          id: number
          insight: number
          intimidation: number
          investigation: number
          medicine: number
          nature: number
          perception: number
          performance: number
          persuasion: number
          religion: number
          sleight_of_hand: number
          stealth: number
          survival: number
        }
        Insert: {
          acrobatics?: number
          animal_handling?: number
          arcana?: number
          athletics?: number
          campaign_id: number
          character_id: number
          created_at?: string
          deception?: number
          history?: number
          id?: number
          insight?: number
          intimidation?: number
          investigation?: number
          medicine?: number
          nature?: number
          perception?: number
          performance?: number
          persuasion?: number
          religion?: number
          sleight_of_hand?: number
          stealth?: number
          survival?: number
        }
        Update: {
          acrobatics?: number
          animal_handling?: number
          arcana?: number
          athletics?: number
          campaign_id?: number
          character_id?: number
          created_at?: string
          deception?: number
          history?: number
          id?: number
          insight?: number
          intimidation?: number
          investigation?: number
          medicine?: number
          nature?: number
          perception?: number
          performance?: number
          persuasion?: number
          religion?: number
          sleight_of_hand?: number
          stealth?: number
          survival?: number
        }
        Relationships: [
          {
            foreignKeyName: "skill_proficiencies_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_proficiencies_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_wallet: {
        Row: {
          campaign_id: number
          character_id: number
          copper_pieces: number
          created_at: string
          electrum_pieces: number
          gold_pieces: number
          id: number
          platinum_pieces: number
          silver_pieces: number
        }
        Insert: {
          campaign_id: number
          character_id: number
          copper_pieces?: number
          created_at?: string
          electrum_pieces?: number
          gold_pieces?: number
          id?: number
          platinum_pieces?: number
          silver_pieces?: number
        }
        Update: {
          campaign_id?: number
          character_id?: number
          copper_pieces?: number
          created_at?: string
          electrum_pieces?: number
          gold_pieces?: number
          id?: number
          platinum_pieces?: number
          silver_pieces?: number
        }
        Relationships: [
          {
            foreignKeyName: "character_wallet_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_wallet_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          alignment: string
          armor_class: number
          background: string
          campaign_id: number | null
          class_name: string
          created_at: string
          current_hp: number
          exp: number
          full_name: string
          hit_dice_type: number
          id: number
          inspiration: number
          level: number
          max_hp: number
          proficiency_bonus: number
          race: string
          speed: number
          temporary_hp: number
          user_id: string | null
        }
        Insert: {
          alignment: string
          armor_class?: number
          background: string
          campaign_id?: number | null
          class_name: string
          created_at?: string
          current_hp?: number
          exp?: number
          full_name: string
          hit_dice_type?: number
          id?: number
          inspiration?: number
          level?: number
          max_hp?: number
          proficiency_bonus?: number
          race: string
          speed?: number
          temporary_hp?: number
          user_id?: string | null
        }
        Update: {
          alignment?: string
          armor_class?: number
          background?: string
          campaign_id?: number | null
          class_name?: string
          created_at?: string
          current_hp?: number
          exp?: number
          full_name?: string
          hit_dice_type?: number
          id?: number
          inspiration?: number
          level?: number
          max_hp?: number
          proficiency_bonus?: number
          race?: string
          speed?: number
          temporary_hp?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "characters_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "characters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      "test-table": {
        Row: {
          created_at: string
          id: number
          note: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
        }
        Relationships: []
      }
      text_details: {
        Row: {
          bonds: string
          campaign_id: number
          character_id: number
          created_at: string
          features_and_traits: string
          flaws: string
          id: number
          ideals: string
          other_proficiencies_and_languages: string
          personality_traits: string
        }
        Insert: {
          bonds?: string
          campaign_id: number
          character_id: number
          created_at?: string
          features_and_traits?: string
          flaws?: string
          id?: number
          ideals?: string
          other_proficiencies_and_languages?: string
          personality_traits?: string
        }
        Update: {
          bonds?: string
          campaign_id?: number
          character_id?: number
          created_at?: string
          features_and_traits?: string
          flaws?: string
          id?: number
          ideals?: string
          other_proficiencies_and_languages?: string
          personality_traits?: string
        }
        Relationships: [
          {
            foreignKeyName: "text_details_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "text_details_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
