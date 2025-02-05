import React, { useState } from 'react';
import { Plus, Edit2, Trash, Save } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Notes() {
  const [setNotes, getNotes] = useLocalStorage('notes');
  const [effect_val, setEffect_val] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  var notes: Array<Note>  = [];
  const temp: any = getNotes();
  if (temp === undefined) {
    setNotes([]);
  }
  else{
    notes = temp;
  }

  const addNote = () => {
    if (title.trim() && content.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    }
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const saveEdit = () => {
    if (editingId && title.trim() && content.trim()) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title: title.trim(), content: content.trim() }
          : note
      ));
      setEditingId(null);
      setTitle('');
      setContent('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    setEditingId(null);
    setTitle('');
    setContent('');
    setEffect_val(effect_val ? 0 : 1);

  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#2D4F3C] mb-6">Notes</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
          />
          <button
            onClick={editingId ? saveEdit : addNote}
            className="w-full bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-lg flex items-center justify-center"
          >
            {editingId ? (
              <>
                <Save className="mr-2" />
                Save Note
              </>
            ) : (
              <>
                <Plus className="mr-2" />
                Add Note
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#2D4F3C]">{note.title}</h3>
                <div className="text-sm text-gray-600">
                  {new Date(note.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(note)}
                  className="text-[#2D4F3C] hover:text-[#1A2F24]"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}