import  { useEffect, useState } from 'react';
import { Plus, Trash, Check } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Reminder {
  id: number;
  text: string;
  date: string;
  completed: boolean;
}

export default function Reminders() {
  const [setReminders, getReminders] = useLocalStorage('reminders');
  const [effect_val, setEffect_val] = useState(0);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  var reminders: Array<Reminder>  = [];
  const temp: any = getReminders();
  if (temp === undefined) {
    setReminders([]);
  }else{
    reminders = temp;
  }
  useEffect(() => {
    reminders = getReminders();
  }, [effect_val]);

  const addReminder = () => {
    if (text.trim() && date) {
      const newReminder: Reminder = {
        id: Date.now(),
        text: text.trim(),
        date,
        completed: false,
      };
      setReminders([...reminders, newReminder]);
      setText('');
      setDate('');
    }
  };

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
    setEffect_val(effect_val ? 0 : 1);
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    setEffect_val(effect_val ? 0 : 1);
  };

  // Sort reminders by date and completion status
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-[#2D4F3C] mb-6">Reminders</h2>
      
      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reminder text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
        />
        <button
          onClick={addReminder}
          className="w-full bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-lg flex items-center justify-center"
        >
          <Plus className="mr-2" />
          Add Reminder
        </button>
      </div>

      <div className="space-y-3">
        {sortedReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              reminder.completed ? 'bg-gray-100' : 'bg-[#F5F2EA]'
            }`}
          >
            <div className="flex items-center flex-1">
              <button
                onClick={() => toggleReminder(reminder.id)}
                className={`w-6 h-6 rounded-full border-2 border-[#2D4F3C] mr-4 flex items-center justify-center
                  ${reminder.completed ? 'bg-[#2D4F3C]' : 'bg-transparent'}`}
              >
                {reminder.completed && <Check className="w-4 h-4 text-[#F5F2EA]" />}
              </button>
              <div className={reminder.completed ? 'line-through text-gray-500' : ''}>
                <div className="font-medium">{reminder.text}</div>
                <div className="text-sm text-gray-600">
                  {new Date(reminder.date).toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteReminder(reminder.id)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}