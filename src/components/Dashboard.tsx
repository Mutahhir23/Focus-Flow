import React from 'react';
import { Target, Calendar, Wallet, StickyNote, Bell, Timer } from 'lucide-react';

function openPage(str: String): void{

  // Change the state of parent component to open the page
  // For example, set the state of the parent component to "goals" to open the goals page
  
  // parentComponent.setState({page: str});
}

interface ChangeHandler {
  handler: (str: String) => void;
}

export default function Dashboard({ handler }: ChangeHandler) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("goals")}>
        <div className="flex items-center mb-4">
          <Target className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Goals</h3>
        </div>
        <p className="text-gray-600">Track and achieve your personal and professional goals.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("habits")}>
        <div className="flex items-center mb-4">
          <Calendar className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Habits</h3>
        </div>
        <p className="text-gray-600">Build and maintain positive daily habits.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("money")}>
        <div className="flex items-center mb-4">
          <Wallet className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Finances</h3>
        </div>
        <p className="text-gray-600">Manage your income and expenses effectively.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("notes")}>
        <div className="flex items-center mb-4">
          <StickyNote className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Notes</h3>
        </div>
        <p className="text-gray-600">Capture and organize your thoughts and ideas.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("reminders")}>
        <div className="flex items-center mb-4">
          <Bell className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Reminders</h3>
        </div>
        <p className="text-gray-600">Never miss important tasks or deadlines.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6" onClick={() => handler("timer")}>
        <div className="flex items-center mb-4">
          <Timer className="w-6 h-6 text-[#2D4F3C] mr-3" />
          <h3 className="text-xl font-bold text-[#2D4F3C]">Pomodoro</h3>
        </div>
        <p className="text-gray-600">Stay focused with timed work sessions.</p>
      </div>
    </div>
  );
}