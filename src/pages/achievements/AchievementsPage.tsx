import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { useProfile } from '../../context/ProfileContext';
import { BADGES } from '../../gamification';

const TIER_STYLES: Record<string, string> = {
  bronze: 'border-amber-300 bg-amber-50',
  silver: 'border-gray-300 bg-gray-50',
  gold: 'border-yellow-400 bg-yellow-50',
};

const AchievementsPage = () => {
  const { profile } = useProfile();
  const earned = new Set(profile.badges);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-gray-600">
          {earned.size} of {BADGES.length} badges earned. Progress is private to you — there is no
          leaderboard.
        </p>
      </div>

      <Card className="p-5">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${(earned.size / BADGES.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {Math.round((earned.size / BADGES.length) * 100)}% of the badge set unlocked
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((badge, index) => {
          const unlocked = earned.has(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.4) }}
            >
              <Card
                className={`p-5 h-full ${
                  unlocked ? TIER_STYLES[badge.tier] : 'opacity-60 border-dashed'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-3xl ${unlocked ? '' : 'grayscale'}`}
                    aria-hidden="true"
                  >
                    {unlocked ? badge.icon : '\u{1F512}'}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-bold text-gray-900">{badge.name}</h2>
                      <Badge variant={unlocked ? 'default' : 'outline'}>{badge.tier}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <p className="text-xs mt-2 font-medium">
                      {unlocked ? (
                        <span className="text-green-700">Earned</span>
                      ) : (
                        <span className="text-gray-500">Locked</span>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="p-5 bg-gray-50">
        <p className="text-sm text-gray-600">
          Badges are awarded for genuine study activity only: sessions completed, questions
          answered, streaks kept on scheduled days, perfect scores, and mock exam results. They are
          never lost once earned.
        </p>
      </Card>
    </div>
  );
};

export default AchievementsPage;
