const KEY = "knowledge-notes";

export function saveNotes(notes: string[]) {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

export function loadNotes(): string[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
