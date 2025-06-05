import React, { useState } from 'react';
import { LeaveCard } from './components/cards';
import { LeaveForm } from './components/Form';
import { leavesSetUp } from '../../../tempData';

export interface LeaveData {
  id: string;
  name: string;
  allowancePerYear: string;
  employeeType: string;
  employeeLevel: string;
}

const SetUpLeaves: React.FC = () => {
  const [editingLeave, setEditingLeave] = useState<LeaveData | null>(null);
  const [leaves, setLeaves] = useState<LeaveData[]>(leavesSetUp);

  const handleEdit = (data: LeaveData) => {
    setEditingLeave(data);
  };

  const handleSave = (formData: Omit<LeaveData, 'id'>) => {
    if (editingLeave) {
      setLeaves(prev => prev.map(leave => 
        leave.id === editingLeave.id 
          ? { ...leave, ...formData }
          : leave
      ));
      setEditingLeave(null);
    } else {
      const newLeave: LeaveData = {
        id: Date.now().toString(),
        ...formData
      };
      setLeaves(prev => [...prev, newLeave]);
    }
  };

  const handleCancel = () => {
    setEditingLeave(null);
  };

  return (
    <div className="max-w-6xl space-y-8">
      <h1 className="text-charcoal text-3xl font-semibold my-6 max-sm:text-xl max-sm:my-3">Total Leaves</h1>
      
      <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-3">
        {leaves.map((leave) => (
          <LeaveCard 
            key={leave.id} 
            data={leave} 
            onEdit={handleEdit}
          />
        ))}
      </div>

      <div className="mt-12">
        <LeaveForm 
          editingLeave={editingLeave}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default SetUpLeaves;