import { FaCog, FaMoon, FaBell, FaLock } from 'react-icons/fa';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <FaCog className="text-gray-400" /> Settings
                </h1>
            </header>

            <div className="bg-dark-panel rounded-xl shadow-sm border border-dark-border divide-y divide-dark-border">
                {/* Appearance */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg">
                            <FaMoon />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Dark Mode</h3>
                            <p className="text-sm text-gray-400">Toggle application theme</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-dark-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 border-gray-600"></div>
                    </label>
                </div>

                {/* Notifications */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-900/20 text-yellow-400 rounded-lg">
                            <FaBell />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Notifications</h3>
                            <p className="text-sm text-gray-400">Manage email and push alerts</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-dark-card peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 border-gray-600"></div>
                    </label>
                </div>

                {/* Security */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-900/20 text-red-400 rounded-lg">
                            <FaLock />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Change Password</h3>
                            <p className="text-sm text-gray-400">Update your account security</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-dark-border rounded-lg text-sm font-medium text-gray-300 hover:bg-dark-card transition-colors">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;