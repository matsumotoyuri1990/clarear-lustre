interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <div className="flex gap-6 relative">
      {/* Number Circle */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-primary">{number}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/70 leading-relaxed">{description}</p>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-secondary to-secondary/30"></div>
      )}
    </div>
  );
}
