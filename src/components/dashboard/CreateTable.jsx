'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

export default function CreateTable() {
  const [columns, setColumns] = useState([{ name: '', type: 'text' }]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Table</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4">
          {columns.map((col, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Column ${index + 1}`}
                value={col.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
              />
              <Select
                value={col.type}
                onValueChange={(value) => handleColumnChange(index, 'type', value)}
              >
                <SelectTrigger>
                  {col.type}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button onClick={() => setColumns([...columns, { name: '', type: 'text' }])}>
            Add Column
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
