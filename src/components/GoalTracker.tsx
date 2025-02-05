import React, { useState } from 'react';
import { Plus, Check, Trash } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

export default function GoalTracker() {
  const [setGoals, getGoals] = useLocalStorage('goals');
  const [effect_val, setEffect_val] = useState(0);
  const [newGoal, setNewGoal] = useState('');

  var goals: Array<Goal>  = [];
  const temp: any = getGoals();
  if (temp === undefined) {
    setGoals([]);
  }
  else{
    goals = temp;
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
    setEffect_val(effect_val ? 0 : 1);
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    setEffect_val(effect_val ? 0 : 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-[#2D4F3C] mb-6">Goal Tracker</h2>
      
      <div className="flex mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-[#2D4F3C]"
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
        />
        <button
          onClick={addGoal}
          className="bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-r-lg flex items-center"
        >
          <Plus className="mr-2" />
          Add Goal
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-4 bg-[#F5F2EA] rounded-lg"
          >
            <div className="flex items-center">
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`w-6 h-6 rounded-full border-2 border-[#2D4F3C] mr-4 flex items-center justify-center
                  ${goal.completed ? 'bg-[#2D4F3C]' : 'bg-transparent'}`}
              >
                {goal.completed && <Check className="w-4 h-4 text-[#F5F2EA]" />}
              </button>
              <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                {goal.text}
              </span>
            </div>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}