import { useState, useEffect, useRef } from "react";
import { type Book } from "../../contexts/booksContext";
import { toast } from "react-toastify";

type BookPayload = Omit<Book, "id">;

interface Props {
  book: Book | null;
  onSave: (payload: BookPayload) => Promise<void>;
  onClose: () => void;
}

const BLANK: BookPayload = {
  title: "",
  subtitle: "",
  cover_image: "",
  author: "Dento Nutrition",
  publisher: "Dento Nutrition",
  price: 0,
  originalPrice: undefined,
  rating: undefined,
  reviews: undefined,
  description: "",
  details: { language: "English", pages: 0, format: "Digital PDF", cod: "Not available" },
  highlights: [],
  coverColor: "bg-orange-500",
  editorNote: "",
  document_url: "",
};

const COLOR_OPTIONS = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-red-500",
];

export default function BookFormModal({ book, onSave, onClose }: Props) {
  const [form, setForm] = useState<BookPayload>(BLANK);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [documentUploadProgress, setDocumentUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = book;
      setForm(rest);
    } else {
      setForm(BLANK);
    }
  }, [book]);

  const set = (path: string, value: unknown) => {
    setForm((prev) => {
      const next = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>;
      }
      cur[keys[keys.length - 1]] = value;
      return next as BookPayload;
    });
  };

  const handleArrayChange = (path: string, idx: number, value: string) => {
    setForm((prev) => {
      const next = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>;
      }
      const arr = [...(cur[keys[keys.length - 1]] as string[])];
      arr[idx] = value;
      cur[keys[keys.length - 1]] = arr;
      return next as BookPayload;
    });
  };

  const addItem = (path: string) => {
    setForm((prev) => {
      const next = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>;
      }
      const arr = [...((cur[keys[keys.length - 1]] as string[]) || []), ""];
      cur[keys[keys.length - 1]] = arr;
      return next as BookPayload;
    });
  };

  const removeItem = (path: string, idx: number) => {
    setForm((prev) => {
      const next = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]] as Record<string, unknown>;
      }
      const arr = [...(cur[keys[keys.length - 1]] as string[])];
      arr.splice(idx, 1);
      cur[keys[keys.length - 1]] = arr;
      return next as BookPayload;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onClose();
      toast.success(book ? "Book updated successfully!" : "Book created successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", `${API_URL}/books/upload-cover`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          set("cover_image", response.cover_url);
          setUploading(false);
          toast.success("Cover image uploaded successfully!");
        } else {
          setUploading(false);
          toast.error("Failed to upload image. Please try again.");
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        toast.error("Failed to upload image. Please try again.");
      };

      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDocument(true);
    setDocumentUploadProgress(0);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", `${API_URL}/books/upload-document`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setDocumentUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          set("document_url", response.document_url);
          setUploadingDocument(false);
          toast.success("Document uploaded successfully!");
        } else {
          setUploadingDocument(false);
          toast.error("Failed to upload document. Please try again.");
        }
      };

      xhr.onerror = () => {
        setUploadingDocument(false);
        toast.error("Failed to upload document. Please try again.");
      };

      xhr.send(formData);
    } catch (err) {
      setUploadingDocument(false);
      toast.error(err instanceof Error ? err.message : "Failed to upload document");
    }
  };

  const inputCls =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";
  const sectionCls = "border border-gray-200 rounded-xl p-4 space-y-3";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">{book ? "Edit Book" : "Add New Book"}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Info */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Basic Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title *</label>
                <input
                  required
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Subtitle</label>
                <input
                  className={inputCls}
                  value={form.subtitle || ""}
                  onChange={(e) => set("subtitle", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Author *</label>
                <input
                  required
                  className={inputCls}
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Publisher *</label>
                <input
                  required
                  className={inputCls}
                  value={form.publisher}
                  onChange={(e) => set("publisher", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Description *</label>
              <textarea
                required
                rows={3}
                className={inputCls}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Pricing & Links
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className={labelCls}>Price (₹) *</label>
                <input
                  required
                  type="number"
                  className={inputCls}
                  value={form.price}
                  onChange={(e) => set("price", Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelCls}>Original Price (₹)</label>
                <input
                  type="number"
                  className={inputCls}
                  value={form.originalPrice ?? ""}
                  onChange={(e) =>
                    set("originalPrice", e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className={inputCls}
                  value={form.rating ?? ""}
                  onChange={(e) =>
                    set("rating", e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Reviews</label>
                <input
                  type="number"
                  className={inputCls}
                  value={form.reviews ?? ""}
                  onChange={(e) =>
                    set("reviews", e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Appearance
            </h3>
            <div>
              <label className={labelCls}>Cover Image</label>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                />
                {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
                {form.cover_image && (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Current image:</p>
                    <img
                      src={form.cover_image}
                      alt="Cover preview"
                      className="h-20 w-auto rounded border border-gray-200 object-cover"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className={inputCls}
                        value={form.cover_image}
                        onChange={(e) => set("cover_image", e.target.value)}
                        placeholder="/my-book-cover.png"
                      />
                      <button
                        type="button"
                        onClick={() => set("cover_image", "")}
                        className="px-3 py-1 text-sm text-red-500 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={labelCls}>Cover Color (fallback)</label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("coverColor", c)}
                    className={`w-8 h-8 cursor-pointer rounded-full ${c} border-2 transition ${form.coverColor === c ? "border-gray-800 scale-110" : "border-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Book Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className={labelCls}>Language</label>
                <input
                  className={inputCls}
                  value={form.details.language}
                  onChange={(e) => set("details.language", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Pages</label>
                <input
                  type="number"
                  className={inputCls}
                  value={form.details.pages}
                  onChange={(e) => set("details.pages", Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelCls}>Format</label>
                <input
                  className={inputCls}
                  value={form.details.format || ""}
                  onChange={(e) => set("details.format", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>COD</label>
                <input
                  className={inputCls}
                  value={form.details.cod}
                  onChange={(e) => set("details.cod", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Highlights
            </h3>
            {(form.highlights || []).map((h, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputCls}
                  value={h}
                  onChange={(e) => handleArrayChange("highlights", i, e.target.value)}
                  placeholder={`Highlight ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeItem("highlights", i)}
                  className="text-red-400 hover:text-red-600 font-bold text-lg px-1 cursor-pointer"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem("highlights")}
              className="text-sm text-orange-500 hover:text-orange-700 font-medium cursor-pointer"
            >
              + Add Highlight
            </button>
          </div>

          {/* Editor Note */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Editor's Note
            </h3>
            <textarea
              rows={2}
              className={inputCls}
              value={form.editorNote || ""}
              onChange={(e) => set("editorNote", e.target.value)}
            />
          </div>

          {/* eBook Document */}
          <div className={sectionCls}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              eBook Document
            </h3>
            <div>
              <label className={labelCls}>Upload eBook (PDF)</label>
              <div className="space-y-2">
                <input
                  ref={documentInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleDocumentUpload}
                  disabled={uploadingDocument}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
                />
                {uploadingDocument && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${documentUploadProgress}%` }}
                    />
                  </div>
                )}
                {form.document_url && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">
                        ✓ Document uploaded: {form.document_url.split("/").pop()}
                      </span>
                      <button
                        type="button"
                        onClick={() => set("document_url", "")}
                        className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition disabled:opacity-60 cursor-pointer"
            >
              {saving ? "Saving…" : book ? "Save Changes" : "Create Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
