
import React from 'react';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';
import SyncStatus from './SyncStatus';

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle,
  className 
}) => {
  return (
    <header className={cn("text-center px-4 py-8", className)}>
      <div className="container max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex-1">
            <SyncStatus />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">{title}</h1>
          <div className="flex-1 flex justify-end">
            <UserMenu />
          </div>
        </div>
        
        {subtitle && (
          <p className="text-gray-600 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default Header;
