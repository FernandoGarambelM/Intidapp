"use client";
import { MissionStep } from "../lib/missionsData";

interface MissionStepsProps {
  step: MissionStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MissionSteps({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrevious
}: MissionStepsProps) {
  return (
    <div className="space-y-6">
      {/* Indicador de Progreso */}
      <div className="bg-white rounded-lg shadow-md p-4 border-2 border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-purple-600">
            Paso {currentStep} de {totalSteps}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  index + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : index + 1 === currentStep
                    ? "bg-purple-600 text-white ring-4 ring-purple-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1 < currentStep ? "✓" : index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Contenido del Paso */}
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📖 {step.title}
        </h2>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-6">
            {step.content}
          </p>
        </div>

        {/* Tips */}
        {step.tips && step.tips.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
              💡 TIPS
            </h3>
            <ul className="space-y-2">
              {step.tips.map((tip, index) => (
                <li key={index} className="text-yellow-900 flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warning */}
        {step.warning && (
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
              ⚠️ IMPORTANTE
            </h3>
            <p className="text-orange-900">{step.warning}</p>
          </div>
        )}

        {/* Recursos Adicionales */}
        {step.resources && step.resources.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              📚 Recursos Adicionales
            </h3>
            <ul className="space-y-2">
              {step.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                  >
                    {resource.type === 'video' && '📺'}
                    {resource.type === 'article' && '📄'}
                    {resource.type === 'quiz' && '🎮'}
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="flex-1 bg-white border-2 border-purple-400 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ◀ Anterior
        </button>
        
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          {currentStep === totalSteps ? "Finalizado ✓" : "Siguiente ▶"}
        </button>
      </div>
    </div>
  );
}
