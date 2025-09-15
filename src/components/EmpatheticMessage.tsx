interface EmpatheticMessageProps {
  step: number;
  className?: string;
}

const messages = {
  1: {
    title: "気持ちを聞かせてください",
    message: "辛い出来事があったのですね。一緒に整理していきましょう。",
    emoji: "💙"
  },
  2: {
    title: "お疲れさまです",
    message: "詳しく教えてくれてありがとうございます。あなたの気持ちに寄り添います。",
    emoji: "🤝"
  },
  3: {
    title: "もう一息です",
    message: "最後のステップです。きっと気持ちが軽くなりますよ。",
    emoji: "🌟"
  },
  completed: {
    title: "お疲れさまでした！",
    message: "よく頑張りました。きっと心が少し軽くなったのではないでしょうか？",
    emoji: "🎉"
  }
};

export default function EmpatheticMessage({ step, className = "" }: EmpatheticMessageProps) {
  const messageKey = step > 3 ? 'completed' : step as keyof typeof messages;
  const { title, message, emoji } = messages[messageKey];

  return (
    <div className={`bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 border border-pink-200 shadow-sm ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="text-2xl animate-pulse">{emoji}</div>
        <div>
          <h3 className="text-lg font-medium text-pink-800 mb-2">{title}</h3>
          <p className="text-pink-700 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}