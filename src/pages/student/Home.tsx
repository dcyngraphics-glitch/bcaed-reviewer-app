import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ProgressRing } from '../../components/ProgressRing';
import { Avatar } from '../../components/Avatar';

const StudentHome: React.FC = () => {
  // Mock data - in a real app, this would come from hooks or context
  const user = {
    name: 'Juan Dela Cruz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    streak: 7,
    xp: 1250,
    level: 5,
    accuracy: 87,
    currentWeek: 3,
    totalWeeks: 12,
    progress: 25, // 25% of 12 weeks
    todayMission: {
      title: 'Master Philippine Folk Dance Steps',
      description: 'Learn the basic steps of Tinikling and Pandanggo sa Ilaw',
      xpReward: 50,
    },
    badges: [
      { id: 1, name: 'Basics Mastered', icon: '🎯', color: 'bg-blue-100 text-blue-800' },
      { id: 2, name: 'Weekly Warrior', icon: '🔥', color: 'bg-orange-100 text-orange-800' },
      { id: 3, name: 'Culture Keeper', icon: '🎭', color: 'bg-purple-100 text-purple-800' },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mb-4"
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Ready to crush today's mission?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 mb-8">
          <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Current Week */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Current Week
              </h3>
              <div className="text-2xl font-bold text-gray-800 flex items-baseline gap-1">
                <span>{user.currentWeek}</span>
                <span className="text-xs text-gray-500">/{user.totalWeeks}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${user.progress}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {user.progress}% Complete
              </p>
            </motion.div>

            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Streak
              </h3>
              <div className="text-2xl font-bold text-gray-800 flex items-baseline gap-1">
                <span>{user.streak}</span>
                <span className="text-xs text-gray-500">days</span>
              </div>
              <div className="mt-2 flex space-x-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        i < user.streak
                          ? '#10b981'
                          : '#e5e7eb',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* XP & Level */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                XP & Level
              </h3>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {user.xp}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-gray-600">
                  Level {user.level}
                </span>
              </div>
              <ProgressRing
                value={user.xp % 500} // Assuming 500 XP per level
                max={500}
                size={80}
                className="mt-4"
                strokeWidth={4}
                trackColor="gray-200"
                color="blue-600"
              />
              <p className="mt-2 text-xs text-gray-500">
                {(user.xp % 500)}/500 XP to Level {user.level + 1}
              </p>
            </motion.div>

            {/* Accuracy */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Accuracy
              </h3>
              <div className="text-3xl font-bold text-gray-800">
                {user.accuracy}%
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${user.accuracy}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Average across all topics
              </p>
            </motion.div>
          </div>
        </div>

        {/* Today's Mission */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Today's Mission
          </h2>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">
              {user.todayMission.title}
            </h3>
            <p className="text-gray-600">
              {user.todayMission.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                +{user.todayMission.xpReward} XP upon completion
              </span>
              <Button
                variant="primary"
                size="md"
                onClick={() => alert('Mission started!')}
              >
                Start Mission
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Your Achievements
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {user.badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-4 ${badge.color} rounded-lg`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-medium text-center text-sm">{badge.name}</h3>
              </motion.div>
            ))}
            {/* Add more badges placeholder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center p-4 bg-gray-100 rounded-lg"
            >
              <div className="text-2xl mb-2">+</div>
              <h3 className="font-medium text-center text-sm text-gray-500">
                Earn More
              </h3>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={() => alert('Practice mode started!')}
            >
              Practice Questions
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={() => alert('Review materials opened!')}
            >
              Study Materials
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={() => alert('Progress report generated!')}
            >
              View Progress
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentHome;