import { useMemo } from 'react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { useContent } from '../../hooks/useContent';
import { DIFFICULTY_LABELS } from '../../types/content';
import type { Difficulty } from '../../types/content';

/**
 * Admin dashboard.
 *
 * The plan's admin scope is: approve students, manage the question bank,
 * subjects, topics, lessons, mock exams, badges, and see statistics. Student
 * approval and remote content storage need a backend, so this screen covers
 * what the bundled data can actually report — bank composition and gaps — and
 * is explicit about what is still pending rather than faking numbers.
 */
const AdminPage = () => {
  const { subjects, topics, questions, topicNames, lessonsFor } = useContent();

  const approved = useMemo(() => questions.filter((q) => q.status === 'approved'), [questions]);
  const pending = useMemo(() => questions.filter((q) => q.status === 'pending'), [questions]);

  const byDifficulty = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const question of approved) counts[question.difficulty] += 1;
    return counts;
  }, [approved]);

  const topicCoverage = useMemo(
    () =>
      topics
        .map((topic) => ({
          topic,
          count: approved.filter((q) => q.topicId === topic.id).length,
          lessons: lessonsFor({ topicId: topic.id }).length,
        }))
        .sort((a, b) => a.count - b.count),
    [topics, approved, lessonsFor],
  );

  const gaps = topicCoverage.filter((entry) => entry.count < 3);
  const missingLessons = topicCoverage.filter((entry) => entry.lessons === 0);
  const subjectsWithoutLessons = missingLessons.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
        <p className="text-gray-600">Question bank health and content coverage.</p>
      </div>

      <Card className="p-5 border-primary-200 bg-primary-50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-gray-900">Draft review queue</h2>
            <p className="text-sm text-gray-700">
              AI-drafted questions awaiting review. Not visible to students.
            </p>
          </div>
          <a href="/admin/review-queue">
            <Button variant="primary">Review drafts</Button>
          </a>
        </div>
      </Card>

      {/* Headline counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Approved questions</p>
          <p className="text-2xl font-bold text-gray-900">{approved.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Awaiting review</p>
          <p className="text-2xl font-bold text-gray-900">{pending.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Subjects / topics</p>
          <p className="text-2xl font-bold text-gray-900">
            {subjects.length} / {topics.length}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Topics below 3 questions</p>
          <p className="text-2xl font-bold text-gray-900">{gaps.length}</p>
        </Card>
      </div>

      {/* Topics with no lesson yet */}
      <Card className="p-5">
        <p className="text-sm text-gray-500 mb-1">Topics without a lesson</p>
        <p className="text-2xl font-bold text-gray-900">{subjectsWithoutLessons}</p>
      </Card>

      {/* Difficulty spread */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Difficulty spread</h2>
        <div className="space-y-3">
          {([1, 2, 3, 4, 5] as Difficulty[]).map((level) => {
            const count = byDifficulty[level];
            const percent = approved.length > 0 ? (count / approved.length) * 100 : 0;
            return (
              <div key={level}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {level} &middot; {DIFFICULTY_LABELS[level]}
                  </span>
                  <span className="text-gray-500">{count} questions</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-primary-600 rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Coverage gaps */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Coverage gaps</h2>
        <p className="text-sm text-gray-500 mb-4">
          Topics with fewer than three approved questions cannot support a focused drill.
        </p>

        {gaps.length === 0 ? (
          <p className="text-sm text-green-700">
            Every topic has at least three approved questions.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {gaps.map(({ topic, count, lessons }) => (
              <li key={topic.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{topic.name}</p>
                  <p className="text-xs text-gray-500">
                    {subjects.find((s) => s.id === topic.subjectId)?.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={count === 0 ? 'destructive' : 'secondary'}>
                    {count} question{count === 1 ? '' : 's'}
                  </Badge>
                  {lessons === 0 ? <Badge variant="outline">No lesson</Badge> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Full coverage table */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">All topics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 pr-4 font-medium">Topic</th>
                <th className="py-2 pr-4 font-medium">Subject</th>
                <th className="py-2 pr-4 font-medium text-right">Questions</th>
                <th className="py-2 font-medium text-right">Lessons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topics.map((topic) => {
                const count = approved.filter((q) => q.topicId === topic.id).length;
                return (
                  <tr key={topic.id}>
                    <td className="py-2 pr-4 text-gray-800">{topic.name}</td>
                    <td className="py-2 pr-4 text-gray-500">
                      {subjects.find((s) => s.id === topic.subjectId)?.name}
                    </td>
                    <td className="py-2 pr-4 text-right text-gray-800">{count}</td>
                    <td className="py-2 text-right text-gray-800">
                      {lessonsFor({ topicId: topic.id }).length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Not yet available */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h2 className="text-lg font-bold text-amber-900 mb-2">Not yet connected</h2>
        <p className="text-sm text-amber-900 mb-3">
          These admin features need a backend and are not wired up yet. They are listed so nothing
          looks finished when it is not:
        </p>
        <ul className="space-y-1 text-sm text-amber-900">
          <li>&bull; Approving or rejecting student accounts</li>
          <li>&bull; Adding, editing and archiving questions in the database</li>
          <li>&bull; Uploading reviewer material and extracting questions from it</li>
          <li>&bull; Reviewing AI-drafted questions before they enter the bank</li>
          <li>&bull; Per-student and cohort analytics</li>
        </ul>
        <p className="text-xs text-amber-800 mt-3">
          Today the bank lives in <code>src/data/seedQuestions.ts</code> and every question is
          already approved. Adding a question there and rerunning the test suite keeps the content
          valid.
        </p>
      </Card>

      {/* Topic name map sanity */}
      <p className="text-xs text-gray-400">
        {Object.keys(topicNames).length} topic names loaded.
      </p>
    </div>
  );
};

export default AdminPage;
