'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Trash2 } from 'lucide-react';

interface HabitCardProps {
  habit: string;
  onDelete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold text-lg">{habit}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Track your progress daily
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;