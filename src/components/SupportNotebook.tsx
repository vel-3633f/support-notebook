'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProgressBar from './ProgressBar';
import EmpatheticMessage from './EmpatheticMessage';

interface FormData {
  situation: string;
  feelings: string;
  desires: string;
}

export default function SupportNotebook() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const watchedValues = watch();
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsCompleted(true);
  };

  const getCurrentFieldValue = () => {
    switch (currentStep) {
      case 1:
        return watchedValues.situation;
      case 2:
        return watchedValues.feelings;
      case 3:
        return watchedValues.desires;
      default:
        return '';
    }
  };

  const isCurrentStepValid = () => {
    const value = getCurrentFieldValue();
    return value && value.trim().length > 0;
  };

  if (isCompleted) {
    const encouragements = [
      "今日のあなたは素晴らしいです ✨",
      "一歩ずつ前に進んでいますね 🌸",
      "あなたの笑顔がきっと誰かの力になります 😊",
      "今この瞬間、あなたは成長しています 🌱",
      "心に花を咲かせてくださいね 🌺"
    ];
    
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-800">寄り添いノート</h1>
          
          <div className="text-center space-y-6">
            <EmpatheticMessage step={4} />
            
            <div className="bg-white rounded-lg p-8 shadow-lg border border-pink-100">
              <div className="text-6xl mb-4">🌈</div>
              <h2 className="text-2xl font-bold text-pink-800 mb-4">元気になるおまじない</h2>
              <p className="text-xl text-pink-700 mb-6">{randomEncouragement}</p>
              <p className="text-gray-600">気持ちを整理できました。また必要な時はいつでも戻ってきてくださいね。</p>
            </div>
            
            <button
              onClick={() => {
                setCurrentStep(1);
                setIsCompleted(false);
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
            >
              もう一度始める
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-800">寄り添いノート</h1>
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <EmpatheticMessage step={currentStep} className="mb-8" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 shadow-lg border border-pink-100">
          {currentStep === 1 && (
            <div>
              <label htmlFor="situation" className="block text-lg font-medium text-gray-800 mb-4">
                どんなことがあったか、教えてください
              </label>
              <textarea
                id="situation"
                {...register('situation', { required: '入力してください' })}
                className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                rows={6}
                placeholder="今日起きた出来事や、気になっていることを自由に書いてください..."
                aria-describedby="situation-help"
              />
              <div id="situation-help" className="sr-only">
                起きた出来事について詳しく記入してください。感情を整理する第一歩です。
              </div>
              {errors.situation && (
                <p className="text-pink-600 text-sm mt-2">{errors.situation.message}</p>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <label htmlFor="feelings" className="block text-lg font-medium text-gray-800 mb-4">
                何が嫌だったか、詳しく聞かせてください
              </label>
              <textarea
                id="feelings"
                {...register('feelings', { required: '入力してください' })}
                className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                rows={6}
                placeholder="どの部分が特に辛かったか、どんな気持ちになったかを書いてください..."
                aria-describedby="feelings-help"
              />
              <div id="feelings-help" className="sr-only">
                感じた気持ちや辛かった部分について詳しく記入してください。
              </div>
              {errors.feelings && (
                <p className="text-pink-600 text-sm mt-2">{errors.feelings.message}</p>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <label htmlFor="desires" className="block text-lg font-medium text-gray-800 mb-4">
                どうなったら良かったと思いますか？
              </label>
              <textarea
                id="desires"
                {...register('desires', { required: '入力してください' })}
                className="w-full p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                rows={6}
                placeholder="理想的にはどうしてほしかったか、次はどうなったらいいかを書いてください..."
                aria-describedby="desires-help"
              />
              <div id="desires-help" className="sr-only">
                理想的な状況や今後の希望について記入してください。
              </div>
              {errors.desires && (
                <p className="text-pink-600 text-sm mt-2">{errors.desires.message}</p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`py-3 px-6 rounded-full font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              戻る
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className={`py-3 px-8 rounded-full font-medium transition-colors ${
                  isCurrentStepValid()
                    ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-md'
                    : 'bg-pink-300 text-pink-100 cursor-not-allowed'
                }`}
              >
                次へ
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isCurrentStepValid()}
                className={`py-3 px-8 rounded-full font-medium transition-colors ${
                  isCurrentStepValid()
                    ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-md'
                    : 'bg-pink-300 text-pink-100 cursor-not-allowed'
                }`}
              >
                完了
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}