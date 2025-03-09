
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, className }) => {
  return (
    <header className={cn("py-8 text-center", className)}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;
