import React from 'react';

interface BadgeProps {
  label: string;
  icon: React.ReactNode;
  color?: string;
}

export default function Badge({ label, icon, color = "bg-accent" }: BadgeProps) {
  return (
    <div className={`flex items-center gap-2 ${color} text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
