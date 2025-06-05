import { Card, CardTitle } from '@/components/ui/card';
import { LeaveData } from '..';
import { Button } from '@/components/ui/button';
import { ImPencil } from 'react-icons/im';

interface LeaveCardProps {
    data: LeaveData;
    onEdit: (data: LeaveData) => void;
  }

export const LeaveCard: React.FC<LeaveCardProps> = ({ data, onEdit }) => {
  return (
    <Card className="relative bg-gray-soft border-0 shadow-none p-3 gap-0 pt-1">
    <Button
    variant="ghost"
    size="sm"
    className="p-0 hover:bg-transparent flex justify-end"
    onClick={() => onEdit(data)}
  >
    <ImPencil className="h-6 w-5 hover:text-charcoal text-white" />
  </Button>
      <div className="flex justify-between items-end gap-4 mt-1 mb-4 px-2">
        <div className="flex-1 max-w-52">
          <CardTitle className="text-2xl font-medium opacity-80 text-charcoal line-clamp-2">
            {data.name}
          </CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-medium opacity-80 text-charcoal">
            {data.allowancePerYear}
          </div>
       
        </div>
      </div>
    </Card>
  );
};