export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          semester: number | null;
          branch: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          semester?: number | null;
          branch?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          semester?: number | null;
          branch?: string | null;
          updated_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          summary: string | null;
          subject: string | null;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          summary?: string | null;
          subject?: string | null;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          summary?: string | null;
          subject?: string | null;
          tags?: string[] | null;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          code: string | null;
          total_classes: number;
          attended_classes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          code?: string | null;
          total_classes?: number;
          attended_classes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string | null;
          total_classes?: number;
          attended_classes?: number;
          updated_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          date: string;
          status: "present" | "absent" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          date: string;
          status: "present" | "absent" | "cancelled";
          created_at?: string;
        };
        Update: {
          status?: "present" | "absent" | "cancelled";
        };
      };
      assignments: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          subject: string | null;
          due_date: string;
          priority: "low" | "medium" | "high";
          status: "pending" | "in_progress" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          subject?: string | null;
          due_date: string;
          priority?: "low" | "medium" | "high";
          status?: "pending" | "in_progress" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          subject?: string | null;
          due_date?: string;
          priority?: "low" | "medium" | "high";
          status?: "pending" | "in_progress" | "completed";
          updated_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          user_id: string;
          note_id: string | null;
          title: string;
          questions: QuizQuestion[];
          score: number | null;
          total: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          note_id?: string | null;
          title: string;
          questions: QuizQuestion[];
          score?: number | null;
          total: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          score?: number | null;
          completed?: boolean;
        };
      };
    };
  };
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
};

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];
export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type Attendance = Database["public"]["Tables"]["attendance"]["Row"];
export type Assignment = Database["public"]["Tables"]["assignments"]["Row"];
export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];