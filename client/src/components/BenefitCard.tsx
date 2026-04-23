import { ReactNode } from 'react';

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="group p-8 rounded-lg border-2 border-border hover:border-secondary transition-all duration-300 hover:shadow-xl hover:bg-muted/20">
      <div className="mb-4 inline-flex p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
        <div className="w-8 h-8 text-secondary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  );
}
