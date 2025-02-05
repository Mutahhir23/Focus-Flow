import React, { useState } from 'react';
import { Plus, Check, Trash } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Habit {
  id: number;
  name: string;
  completedDates: string[];
}

export default function HabitTracker() {
  const [setHabits, getHabits] = useLocalStorage('habits');
  const [effect_val, setEffect_val] = useState(0);
  const [newHabit, setNewHabit] = useState('');

  var habits: Array<Habit>  = [];
  const temp: any = getHabits();
  if (temp === undefined) {
    setHabits([]);
  }
  else{
    habits = temp;
  }

  const getDatesForCurrentWeek = () => {
    const dates = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getDatesForCurrentWeek();

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, completedDates: [] }]);
      setNewHabit('');
    }
  };

  const toggleDate = (habitId: number, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        return { ...habit, completedDates };
      }
      return habit;
    }));
    setEffect_val(effect_val ? 0 : 1);
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
    setEffect_val(effect_val ? 0 : 1);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-[#2D4F3C] mb-6">Habit Tracker</h2>
      
      <div className="flex mb-6">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-[#2D4F3C]"
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <button
          onClick={addHabit}
          className="bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-r-lg flex items-center"
        >
          <Plus className="mr-2" />
          Add Habit
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-3">Habit</th>
              {weekDates.map(date => (
                <th key={date} className="p-3 text-center">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </th>
              ))}
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <tr key={habit.id} className="border-t">
                <td className="p-3">{habit.name}</td>
                {weekDates.map(date => (
                  <td key={date} className="p-3 text-center">
                    <button
                      onClick={() => toggleDate(habit.id, date)}
                      className={`w-8 h-8 rounded-full border-2 border-[#2D4F3C] flex items-center justify-center
                        ${habit.completedDates.includes(date) ? 'bg-[#2D4F3C]' : 'bg-transparent'}`}
                    >
                      {habit.completedDates.includes(date) && (
                        <Check className="w-5 h-5 text-[#F5F2EA]" />
                      )}
                    </button>
                  </td>
                ))}
                <td className="p-3">
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}