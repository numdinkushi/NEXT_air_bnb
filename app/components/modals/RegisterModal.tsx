'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => { }} />
            <div className="text-neutral-500 text-center p-4 font-light">
                <div className="flex items-center gap-2 justify-center">
                    <div className="">Already have an account?</div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Login</div>
                </div>
            </div>
        </div>
    )

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading center title='Welcome to Airbnb' subtitle='Create an account' />
            <Input id='email' type='email' label='Email' errors={errors} disabled={isLoading} register={register} required />
            <Input id='name' label='Name' errors={errors} disabled={isLoading} register={register} required />
            <Input id='password' type='password' label='Password' errors={errors} disabled={isLoading} register={register} required />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;