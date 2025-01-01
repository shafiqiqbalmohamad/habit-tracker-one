"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";

interface HabitCardProps {
  habit: string;
  onDelete: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onDelete }) => {
  // State to track whether the habit is marked as done
  const [isChecked, setIsChecked] = useState(false);

  // Toggle the checked state
  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold text-lg">{habit}</h3>
        <div className="flex gap-2">
          {/* CheckCircle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCheck}
            className={isChecked ? "text-green-500" : "text-gray-500"}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          {/* Trash2 Button */}
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
