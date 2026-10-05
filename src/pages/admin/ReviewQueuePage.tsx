import { useMemo, useState } from 'react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { useContent } from '../../hooks/useContent';
import { DRAFT_QUESTIONS } from '../../data/draftQuestions';
import { ALL_DRAFTS } from '../../data/batches';
import { summariseDrafts, draftsByTopic, validateDraft } from '../../pipeline';
import { DIFFICULTY_LABELS } from '../../types/content';

/**
 * Admin review queue for AI-drafted questions (plan Stage 8).
 *
 * The plan requires that AI-generated questions go through admin review before
 * they can reach an exam. Nothing on this page is visible to a student, and the
 * engine enforces that independently — this is the human half of the gate.
 *
 * Approving here is deliberately not wired to a write. Publishing a question
 * means moving it out of `src/data/draftQuestions.ts` into a live bank file,
 * which is a code change that reruns the content-integrity tests. A button that
 * silently published content into an exam without that step would be worse than
 * no button, so the page says so instead.
 */
const ReviewQueuePage = () => {
  const { topicNames, subjectNames } = useContent();
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [showOnlyProblems, setShowOnlyProblems] = useState(false);

  const allDrafts = useMemo(() => [...DRAFT_QUESTIONS, ...ALL_DRAFTS], []);
  const summary = useMemo(() => summariseDrafts(allDrafts), []);
  const grouped = useMemo(() => draftsByTopic(allDrafts), []);

  const problems = useMemo(
    () =>
      allDrafts.map((draft) => ({ id: draft.id, issues: validateDraft(draft) })).filter(
        (entry) => entry.issues.length > 0,
      ),
    [],
  );

  const topics = Object.keys(grouped).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Draft review queue</h1>
        <p className="text-gray-600">
          {summary.total} AI-drafted questions awaiting review across the original batch and
          five written batches. None of these are visible to students — the engine
          only ever serves approved questions.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Awaiting review</p>
          <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Failing validation</p>
          <p className={`text-2xl font-bold ${summary.invalid > 0 ? 'text-red-700' : 'text-green-700'}`}>
            {summary.invalid}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Situational</p>
          <p className="text-2xl font-bold text-gray-900">{summary.situational}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Topics covered</p>
          <p className="text-2xl font-bold text-gray-900">{topics.length}</p>
        </Card>
      </div>

      {/* Difficulty and subject spread */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What this batch adds</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">By difficulty band</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Easy: {summary.byBand.easy}</Badge>
              <Badge variant="outline">Moderate: {summary.byBand.moderate}</Badge>
              <Badge variant="outline">Difficult: {summary.byBand.difficult}</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">By subject</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(summary.bySubject).map(([id, count]) => (
                <Badge key={id} variant="secondary">
                  {subjectNames[id] ?? id}: {count}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Validation failures */}
      {problems.length > 0 ? (
        <Card className="p-6 bg-red-50 border-red-200">
          <h2 className="text-lg font-bold text-red-900 mb-3">
            {problems.length} draft{problems.length === 1 ? '' : 's'} would be rejected
          </h2>
          <ul className="space-y-2 text-sm text-red-900">
            {problems.map((entry) => (
              <li key={entry.id}>
                <span className="font-mono">{entry.id}</span>: {entry.issues.join('; ')}
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="p-5 bg-green-50 border-green-200">
          <p className="text-sm text-green-800">
            All {summary.total} drafts pass validation: four options each, valid correct index, a
            cited source, and a vignette and rationale on every situational item.
          </p>
        </Card>
      )}

      {/* Per-topic review */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Review by topic</h2>
          <button
            type="button"
            onClick={() => setShowOnlyProblems((v) => !v)}
            className="text-sm text-primary-700 hover:underline"
          >
            {showOnlyProblems ? 'Show all' : 'Show only problems'}
          </button>
        </div>

        <div className="space-y-2">
          {topics.map((topicId) => {
            const drafts = grouped[topicId];
            const open = openTopic === topicId;
            const badCount = drafts.filter((d) => validateDraft(d).length > 0).length;

            if (showOnlyProblems && badCount === 0) return null;

            return (
              <div key={topicId} className="rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenTopic(open ? null : topicId)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    {topicNames[topicId] ?? topicId}
                  </span>
                  <span className="flex items-center gap-2">
                    <Badge variant="outline">{drafts.length}</Badge>
                    {badCount > 0 ? <Badge variant="destructive">{badCount} bad</Badge> : null}
                    <span className="text-gray-400 text-lg leading-none" aria-hidden="true">
                      {open ? '\u2212' : '+'}
                    </span>
                  </span>
                </button>

                {open ? (
                  <div className="px-4 pb-4 space-y-5">
                    {drafts.map((draft) => {
                      const issues = validateDraft(draft);
                      return (
                        <article key={draft.id} className="border-t border-gray-100 pt-4">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="font-mono text-xs text-gray-500">{draft.id}</span>
                            <Badge variant="outline">{DIFFICULTY_LABELS[draft.difficulty]}</Badge>
                            <Badge variant="secondary">{subjectNames[draft.subjectId]}</Badge>
                            {issues.length > 0 ? (
                              <Badge variant="destructive">{issues.length} problem(s)</Badge>
                            ) : null}
                          </div>

                          {issues.length > 0 ? (
                            <p className="text-sm text-red-700 mb-3">{issues.join('; ')}</p>
                          ) : null}

                          {draft.vignette ? (
                            <div className="mb-3 rounded bg-gray-50 border-l-4 border-gray-300 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                                Vignette
                              </p>
                              <p className="text-sm text-gray-700 whitespace-pre-line">
                                {draft.vignette}
                              </p>
                            </div>
                          ) : null}

                          <p className="font-medium text-gray-900 mb-3">{draft.prompt}</p>

                          <ol className="space-y-1 mb-3">
                            {draft.options.map((option, index) => (
                              <li
                                key={option}
                                className={`text-sm flex gap-2 ${
                                  index === draft.correctIndex
                                    ? 'text-green-800 font-medium'
                                    : 'text-gray-700'
                                }`}
                              >
                                <span className="font-mono shrink-0">
                                  {['A', 'B', 'C', 'D'][index]}.
                                </span>
                                <span>
                                  {option}
                                  {index === draft.correctIndex ? '  \u2713' : ''}
                                </span>
                              </li>
                            ))}
                          </ol>

                          <div className="rounded bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                              Explanation
                            </p>
                            <p className="text-sm text-gray-700">{draft.explanation}</p>
                          </div>

                          {draft.rationale ? (
                            <p className="text-xs text-gray-600 mb-2">
                              <span className="font-semibold">Tests: </span>
                              {draft.rationale}
                            </p>
                          ) : null}

                          <p className="text-xs text-gray-500">
                            <span className="font-semibold">Source: </span>
                            {draft.source}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>

      {/* How approval actually works */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h2 className="text-lg font-bold text-amber-900 mb-2">How approving works</h2>
        <p className="text-sm text-amber-900 mb-3">
          Publishing a draft means moving it out of{' '}
          <code className="font-mono">src/data/draftQuestions.ts</code> or{' '}
          <code className="font-mono">src/data/batches/</code> and into a live bank file.
          That is a code change, and it reruns the content-integrity test suite — which is the point.
          A button that published straight into an exam, skipping that check, would be worse than no
          button at all.
        </p>
        <p className="text-xs text-amber-800">
          The engine enforces the same rule independently: <code className="font-mono">eligible()</code>{' '}
          only ever returns questions whose status is <code className="font-mono">approved</code>, and
          a test asserts that no draft can leak into practice or a mock even when the drafts are
          merged into the pool.
        </p>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => window.location.assign('/admin')}>
          Back to admin
        </Button>
      </div>
    </div>
  );
};

export default ReviewQueuePage;
