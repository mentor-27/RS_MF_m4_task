import { Button, Center, Group, PasswordInput, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AtSign, Hash } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '@context/AuthProvider';

type TLogin = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Email required'),
  password: yup.string().required('Password required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth?.userData) {
    return <Navigate to={'/'} replace />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TLogin) => {
    auth?.signin(data.email, data.password, () =>
      navigate('/', { replace: true })
    );
  };

  return (
    <Center h={'50vh'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('email')}
          error={errors.email?.message}
          type="email"
          label="Email"
          placeholder="Your email"
          leftSection={<AtSign size="1rem" />}
        />
        <PasswordInput
          {...register('password')}
          error={errors.password?.message}
          type="password"
          label="Password"
          placeholder="Your password"
          leftSection={<Hash size="1rem" />}
          mt="xs"
        />
        <Group grow>
          <Button mt="lg" type="submit">
            Login
          </Button>
          <Button
            variant="outline"
            mt="lg"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        </Group>
      </form>
    </Center>
  );
};
