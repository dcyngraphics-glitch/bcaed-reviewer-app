import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { useProfile } from '../../context/ProfileContext';
import { levelFromXp } from '../../engine/progress';
import { useAuth } from '../../routes/auth';
import { SCHEDULED_WEEKDAYS, WEEKLY_PLAN } from '../../program';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ProfilePage = () => {
  const { profile, stats, resetProfile } = useProfile();
  const { logout } = useAuth();
  const [confirmReset, setConfirmReset] = useState(false);

  const level = levelFromXp(profile.xp);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Your account and study settings.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold"
            aria-hidden="true"
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{profile.name}</p>
            <p className="text-sm text-gray-500">
              Level {level.level} &middot; {profile.xp} XP
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Program started</dt>
            <dd className="font-medium text-gray-900">{profile.startDate}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Target difficulty</dt>
            <dd className="font-medium text-gray-900">Level {profile.targetDifficulty} of 5</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Questions answered</dt>
            <dd className="font-medium text-gray-900">{stats.questionsAnswered}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Overall accuracy</dt>
            <dd className="font-medium text-gray-900">{stats.accuracy}%</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Study schedule</h2>
        <ul className="divide-y divide-gray-100">
          {WEEKLY_PLAN.map((day) => (
            <li key={day.weekday} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{DAY_NAMES[day.weekday]}</p>
                <p className="text-xs text-gray-500">{day.summary}</p>
              </div>
              <Badge variant={day.required ? 'default' : 'outline'}>
                {day.required ? 'Required' : day.kind === 'rest' ? 'Rest' : 'Optional'}
              </Badge>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4">
          Streaks count {SCHEDULED_WEEKDAYS.map((d) => DAY_NAMES[d]).join(', ')} only. Rest days
          never break a streak.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Your data</h2>
        <p className="text-sm text-gray-600 mb-4">
          Progress is stored on this device only. Nobody else can see your scores or your progress.
          Clearing it cannot be undone.
        </p>

        {confirmReset ? (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="destructive"
              onClick={() => {
                resetProfile(profile.name);
                setConfirmReset(false);
              }}
            >
              Yes, clear my progress
            </Button>
            <Button variant="outline" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setConfirmReset(true)}>
            Clear my progress
          </Button>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Session</h2>
        <Button variant="outline" onClick={logout}>
          Sign out
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
