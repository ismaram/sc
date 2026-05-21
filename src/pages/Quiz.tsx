import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, AlertCircle } from 'lucide-react';
import { quizData } from '../data/quiz';

type QuizState = 'intro' | 'playing' | 'results';

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
      <div
        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = quizData[currentQ];
  const score = answers.filter((a, i) => a === quizData[i].correctAnswer).length;
  const isCorrect = selected === question?.correctAnswer;

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    if (currentQ + 1 < quizData.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setState('results');
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const pct = (score / quizData.length) * 100;
    if (pct === 100) return { emoji: '🏆', title: 'Parfait !', text: 'Vous connaissez tous les bons gestes. Bravo !', color: 'text-yellow-600' };
    if (pct >= 70) return { emoji: '🌟', title: 'Très bien !', text: 'Vous avez de très bons réflexes. Quelques points à revoir !', color: 'text-teal-600' };
    if (pct >= 50) return { emoji: '📚', title: 'Pas mal !', text: 'Des bases solides, mais quelques idées reçues à corriger.', color: 'text-blue-600' };
    return { emoji: '💪', title: 'À réviser', text: 'Ne vous découragez pas ! Relisez les fiches d\'urgence et retentez le quiz.', color: 'text-orange-600' };
  };

  if (state === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl">
            🧠
          </div>
          <h1 className="font-quicksand font-bold text-3xl text-slate-800 mb-3">
            Quiz Réflexe Parent
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
            Testez vos connaissances avec des scénarios réels. Chaque réponse est expliquée par un professionnel de santé.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 mb-6 space-y-4">
          {[
            { icon: '❓', title: `${quizData.length} questions`, desc: 'Des scénarios tirés de la vie réelle' },
            { icon: '📖', title: 'Explications détaillées', desc: 'Chaque réponse est commentée par un expert' },
            { icon: '⏱️', title: 'À votre rythme', desc: 'Prenez le temps de réfléchir à chaque question' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-quicksand font-bold text-slate-800">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600">
            Ce quiz est éducatif. En cas d'urgence réelle, appelez immédiatement le <strong>15</strong> ou le <strong>112</strong>.
          </p>
        </div>

        <button
          onClick={() => setState('playing')}
          className="btn-primary w-full text-center justify-center flex items-center gap-2 py-4 text-base"
        >
          Commencer le quiz
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (state === 'results') {
    const msg = getScoreMessage();
    const finalScore = answers.filter((a, i) => a === quizData[i].correctAnswer).length;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-5 text-5xl">
            {msg.emoji}
          </div>
          <h1 className="font-quicksand font-bold text-3xl text-slate-800 mb-2">{msg.title}</h1>
          <p className={`text-4xl font-quicksand font-bold mb-3 ${msg.color}`}>
            {finalScore} / {quizData.length}
          </p>
          <p className="text-slate-600">{msg.text}</p>
        </div>

        {/* Answers review */}
        <div className="space-y-3 mb-8">
          {quizData.map((q, i) => {
            const correct = answers[i] === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`rounded-2xl p-4 border ${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
              >
                <div className="flex items-start gap-3">
                  {correct
                    ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 mb-1">{q.question}</p>
                    {!correct && (
                      <p className="text-xs text-green-700 bg-green-100 rounded-lg px-3 py-1.5 mt-2">
                        Bonne réponse : {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${correct ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {q.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="btn-secondary flex items-center gap-2 flex-1 justify-center"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
          <button
            onClick={handleRestart}
            className="btn-primary flex items-center gap-2 flex-1 justify-center"
          >
            <Trophy className="w-4 h-4" />
            Partager le score
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-500">
          Question {currentQ + 1} sur {quizData.length}
        </span>
        <span className="text-xs bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-full">
          {question.category}
        </span>
      </div>

      <ProgressBar current={currentQ + 1} total={quizData.length} />

      {/* Question */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 mb-5">
        <h2 className="font-quicksand font-bold text-xl text-slate-800 mb-3 leading-snug">
          {question.question}
        </h2>

        {question.scenario && (
          <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-400 mb-0">
            <p className="text-sm text-slate-600 italic">
              <span className="font-semibold text-blue-600">Scénario : </span>
              {question.scenario}
            </p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-5">
        {question.options.map((opt, i) => {
          let style = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-300';
          if (selected !== null) {
            if (i === question.correctAnswer) {
              style = 'bg-green-50 border-green-400 text-green-800';
            } else if (i === selected && selected !== question.correctAnswer) {
              style = 'bg-red-50 border-red-400 text-red-800';
            } else {
              style = 'bg-slate-50 border-slate-100 text-slate-400';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-medium text-sm transition-all duration-200 flex items-center gap-3 ${style} ${
                selected === null ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${
                selected !== null && i === question.correctAnswer
                  ? 'bg-green-500 border-green-500 text-white'
                  : selected !== null && i === selected && i !== question.correctAnswer
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-slate-300 text-slate-500'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {selected !== null && i === question.correctAnswer && (
                <CheckCircle className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />
              )}
              {selected !== null && i === selected && i !== question.correctAnswer && (
                <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`rounded-3xl p-5 mb-5 animate-slide-up border-2 ${
          isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect
              ? <CheckCircle className="w-5 h-5 text-green-500" />
              : <XCircle className="w-5 h-5 text-red-500" />
            }
            <span className={`font-quicksand font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait...'}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 animate-slide-up"
        >
          {currentQ + 1 < quizData.length ? (
            <>Question suivante <ChevronRight className="w-5 h-5" /></>
          ) : (
            <>Voir mes résultats <Trophy className="w-5 h-5" /></>
          )}
        </button>
      )}
    </div>
  );
}
