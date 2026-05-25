"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Brain,
  Plus,
  Trash2,
  FileText,
  Upload,
  X,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
  summary: string | null;
  subject: string | null;
  tags: string[] | null;
  created_at: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        if (!cancelled && data.notes) {
          setNotes(data.notes);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load notes");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadNotes();

    return () => {
      cancelled = true;
    };
  }, []);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      toast.error("Only .txt and .md files are supported");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
      if (!title) setTitle(file.name.replace(/\.(txt|md)$/, ""));
      toast.success("File loaded successfully");
    };
    reader.readAsText(file);
  };

  // Add tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Create note
  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, subject, tags }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create note");
        return;
      }

      toast.success("Note saved!");
      setNotes([data.note, ...notes]);
      resetForm();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  // Delete note
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((n) => n.id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  // Summarize note with AI
  const handleSummarize = async (note: Note) => {
    if (!note.content.trim()) {
      toast.error("Cannot summarize an empty note");
      return;
    }

    setSummarizingId(note.id);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId: note.id, content: note.content }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate summary");
        return;
      }

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? { ...n, summary: data.summary } : n))
      );
      setExpandedNote(note.id);
      toast.success("Summary generated");
    } catch {
      toast.error("Something went wrong while summarizing");
    } finally {
      setSummarizingId(null);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSubject("");
    setTags([]);
    setTagInput("");
    setShowForm(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notes</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {notes.length} note{notes.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-900 hover:bg-slate-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900">
                Create New Note
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetForm}
                className="h-8 w-8 text-slate-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Title</Label>
              <Input
                placeholder="e.g. OS Scheduling Algorithms"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Subject <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                placeholder="e.g. Operating Systems"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Content</Label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload .txt / .md
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Textarea
                placeholder="Paste your notes here or upload a file..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-slate-200 min-h-[180px] resize-none font-mono text-sm"
              />
              <p className="text-xs text-slate-400">
                {content.length} characters · {content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Tags <span className="text-slate-400 font-normal">(press Enter to add)</span>
              </Label>
              <Input
                placeholder="e.g. exam, important"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="border-slate-200"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-slate-100 text-slate-600 border-0 gap-1 pr-1"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3 hover:text-slate-900" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleCreate}
                disabled={creating}
                className="bg-slate-900 hover:bg-slate-700 text-white gap-2"
              >
                <BookOpen className="w-4 h-4" />
                {creating ? "Saving..." : "Save Note"}
              </Button>
              <Button variant="outline" onClick={resetForm} className="border-slate-200">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-medium mb-1">No notes yet</h3>
          <p className="text-slate-400 text-sm mb-4">
            Create your first note to get started
          </p>
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            className="border-slate-200 gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Note
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="border-slate-100 hover:border-slate-200 transition-all"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        {note.subject && (
                          <span className="text-xs text-slate-500">{note.subject}</span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {formatDate(note.created_at)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {note.content.split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="bg-slate-100 text-slate-500 border-0 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-slate-500 hover:text-blue-700 gap-1.5"
                      onClick={() => handleSummarize(note)}
                      disabled={summarizingId === note.id}
                    >
                      <Brain className="w-4 h-4" />
                      {summarizingId === note.id ? "Summarizing..." : "Summarize"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={() =>
                        setExpandedNote(expandedNote === note.id ? null : note.id)
                      }
                    >
                      {expandedNote === note.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-rose-500"
                      onClick={() => handleDelete(note.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded content */}
                {expandedNote === note.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    {note.summary && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs font-semibold text-blue-700 mb-1 flex items-center gap-1">
                          <Brain className="w-3.5 h-3.5" />
                          AI Summary
                        </p>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {note.summary}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-mono">
                      {note.content}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
