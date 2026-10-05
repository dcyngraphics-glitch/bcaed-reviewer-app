import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { useContent } from '../../hooks/useContent';
import { DIFFICULTY_LABELS } from '../../types/content';

/** The review library: subjects -> topics -> lessons. */
const ReviewPage = () => {
  const { subjects, topicsFor, lessonsFor, questionCountFor } = useContent();

  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '');
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const topics = topicsFor(subjectId);
  const lessons = lessonsFor({ subjectId });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review</h1>
        <p className="text-gray-600">
          Study the lesson before you drill the questions.
        </p>
      </div>

      {/* Subject tabs */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            type="button"
            onClick={() => {
              setSubjectId(subject.id);
              setOpenLesson(null);
            }}
            aria-pressed={subjectId === subject.id}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              subjectId === subject.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      <Card className="p-5 bg-gray-50">
        <p className="text-sm text-gray-700">
          {subjects.find((s) => s.id === subjectId)?.description}
        </p>
      </Card>

      {/* Topics and their lessons */}
      {topics.map((topic) => {
        const topicLessons = lessons.filter((lesson) => lesson.topicId === topic.id);
        const questionCount = questionCountFor({ topicId: topic.id });

        return (
          <Card key={topic.id} className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900">{topic.name}</h2>
              <div className="flex gap-2">
                <Badge variant="outline">{questionCount} questions</Badge>
                <Badge variant="secondary">{topicLessons.length} lessons</Badge>
              </div>
            </div>

            {topicLessons.length === 0 ? (
              <p className="text-sm text-gray-500">
                No lesson written for this topic yet. You can still practise the questions.
              </p>
            ) : (
              <div className="space-y-3">
                {topicLessons.map((lesson) => {
                  const open = openLesson === lesson.id;
                  return (
                    <div key={lesson.id} className="rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() => setOpenLesson(open ? null : lesson.id)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900 text-sm">{lesson.title}</span>
                        <span className="text-gray-400 text-lg leading-none" aria-hidden="true">
                          {open ? '\u2212' : '+'}
                        </span>
                      </button>

                      {open ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-4 pb-4 overflow-hidden"
                        >
                          <p className="text-sm text-gray-600 mb-3">{lesson.summary}</p>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                            Key points
                          </p>
                          <ul className="space-y-2">
                            {lesson.keyPoints.map((point) => (
                              <li key={point} className="flex gap-2 text-sm text-gray-700">
                                <span className="text-primary-600 shrink-0" aria-hidden="true">
                                  &bull;
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })}

      {/* Difficulty legend */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Difficulty levels</h2>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3, 4, 5] as const).map((level) => (
            <Badge key={level} variant="outline">
              {level} &middot; {DIFFICULTY_LABELS[level]}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          The app raises your target level one step at a time as your accuracy improves, and drops
          it back when you struggle.
        </p>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => window.location.assign('/practice')}>
          Practise this subject
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;
