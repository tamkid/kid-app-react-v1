import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-fields/InputField';

TodoForm.propTypes = {};

function TodoForm(props) {
  const { handleSubmit, control } = useForm();

  const formSubmit = (data) => {
    console.log('FORM SUBMIT', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <InputField name="title" control={control} label="Title" />
        <InputField name="description" control={control} label="description" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default TodoForm;
