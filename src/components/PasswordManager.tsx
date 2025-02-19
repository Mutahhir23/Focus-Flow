import React, { useState } from 'react';
import { Plus, Trash, Eye, EyeOff, Lock, Globe, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Password {
    id: number;
    application: string;
    username: string;
    email: string;
    password: string;
    date: string;
}

export default function PasswordManager() {
    const [setPasswords, getPasswords] = useLocalStorage('passwords');

    const [effect_val, setEffect_val] = useState(0);
    const [application, setApplication] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showStoredPasswords, setShowStoredPasswords] = useState<{ [key: number]: boolean }>({});


    var passwords: Array<Password> = [];
    const temp: any = getPasswords();
    if (temp === undefined) {
        setPasswords([]);
    }
    else {
        passwords = temp;
    }

    const addPassword = () => {
        if (application.trim() && username.trim() && email.trim() && password.trim()) {
            const newPassword: Password = {
                id: Date.now(),
                application: application.trim(),
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
                date: new Date().toISOString(),
            };
            setPasswords([ newPassword, ...passwords]);
            setApplication('');
            setUsername('');
            setEmail('');
            setPassword('');
            setShowPassword(false);
        }
    };

    const deletePassword = (id: number) => {
        setPasswords(passwords.filter(p => p.id !== id));
        setEffect_val(effect_val ? 0 : 1);
    };

    const toggleStoredPassword = (id: number) => {
        setShowStoredPasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-[#2D4F3C] mr-3" />
                <h2 className="text-2xl font-bold text-[#2D4F3C]">Password Manager</h2>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <label htmlFor="application" className="block text-sm font-medium text-gray-700 mb-1">
                        Platform
                    </label>
                    <div className="relative">
                        <input
                            id="application"
                            type="text"
                            value={application}
                            onChange={(e) => setApplication(e.target.value)}
                            placeholder="Enter platform name"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
                        />
                        <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C] pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#2D4F3C]"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    onClick={addPassword}
                    className="w-full bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-lg flex items-center justify-center"
                >
                    <Plus className="mr-2" />
                    Save Password
                </button>
            </div>

            <div className="space-y-4">
                {passwords.map((entry) => (
                    <div
                        key={entry.id}
                        className="bg-[#F5F2EA] p-4 rounded-lg space-y-2"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Globe className="w-4 h-4 text-[#2D4F3C] mr-2" />
                                        <div className="font-medium text-[#2D4F3C]">{entry.application}</div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 ml-4">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {formatDate(entry.date)}
                                    </div>
                                </div>
                                <div className="font-medium ml-6">{entry.username}</div>
                                <div className="text-sm text-gray-600 ml-6">{entry.email}</div>
                                <div className="flex items-center ml-6">
                                    <input
                                        type={showStoredPasswords[entry.id] ? 'text' : 'password'}
                                        value={entry.password}
                                        readOnly
                                        className="bg-transparent border-none p-0 focus:outline-none text-gray-700"
                                    />
                                    <button
                                        onClick={() => toggleStoredPassword(entry.id)}
                                        className="ml-2 text-gray-500 hover:text-[#2D4F3C]"
                                    >
                                        {showStoredPasswords[entry.id] ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => deletePassword(entry.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}