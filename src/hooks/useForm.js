import { useState } from 'react';

const useForm = (initState = Object) => {
  const [state, setState] = useState(initState);

  const onChange = (value, field) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};

export default useForm;
