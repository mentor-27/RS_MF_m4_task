import { Button, Center, Group, PasswordInput, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AtSign, Hash } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLocalStorage } from '@hooks/useLocalStorage.ts';
import { registerUser } from '../../../firebase.ts';

type TRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().required('Email required'),
  password: yup.string().required('Password required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Confirmation required'),
});

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useLocalStorage('session', null);

  if (userData) {
    return <Navigate to={'/'} replace />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TRegister) => {
    try {
      const credentials = await registerUser(data.email, data.confirmPassword);

      if (credentials?.user) {
        setUserData(credentials.user);
        navigate('/', { replace: true });
      }
    } catch (error) {
      let msg: string = '';

      if ((error as Error).message.includes('email-already-in-use')) {
        msg = 'Just visit login page and come in';
      }

      notifications.show({
        title: 'Already with us',
        message: msg,
        color: 'orange',
        withCloseButton: true,
      });
    }
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
        <TextInput
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          type="password"
          label="Confirm"
          placeholder="Confirm password"
          leftSection={<Hash size="1rem" />}
        />
        <Group grow>
          <Button mt="lg" type="submit">
            Register
          </Button>
          <Button variant="outline" mt="lg" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </Group>
      </form>
    </Center>
  );
};
