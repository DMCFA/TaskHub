'use client';

import { useState } from 'react';
import Input from '../../../components/Form/Input';

interface FormState {
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: Date;
  start_date: Date | null;
  completion_date: Date | null;
  tags: string[];
  attachments: string[];
  subtasks: number[];
  followers: number[];
  estimated_time: number | null;
  actual_time: number | null;
  task_dependencies: number[];
  assigned_user_id: number;
  project_id: number;
}

interface ErrorState {
  title: boolean;
  description: boolean;
}

const initialFormState: FormState = {
  title: '',
  description: '',
  status: '',
  priority: '',
  due_date: new Date(),
  start_date: null,
  completion_date: null,
  tags: [],
  attachments: [],
  subtasks: [],
  followers: [],
  estimated_time: null,
  actual_time: null,
  task_dependencies: [],
  assigned_user_id: 0,
  project_id: 0,
};

const initialErrorState: ErrorState = {
  title: false,
  description: false,
};

export default function TaskForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const arrayValue = value.split(',').map((item) => item.trim());
    setFormState((prev) => ({ ...prev, [name]: arrayValue }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <div className='add-task'>
      <div className='add-task__container'>
        <h1 className='add-task__heading'>Add your task</h1>
        <form onSubmit={handleSubmit} className='add-task__form'>
          <Input
            id='task-title'
            name='title'
            label='Title'
            helperText='Task title here'
            value={formState.title}
            onChange={handleInputChange}
            wrapperClass='add-task__title'
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
