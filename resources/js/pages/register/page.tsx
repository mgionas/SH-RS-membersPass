import {Head, useForm} from "@inertiajs/react";
import {InputGroup, InputGroupAddon, InputGroupInput, InputGroupText} from "@/components/ui/input-group";
import {Button} from "@/components/ui/button";
import {store} from "@/routes/register";
import {Field, FieldDescription} from "@/components/ui/field";
import DatePicker from "@/components/ui/date-picker";
import {format} from "date-fns";

const RegisterPage = () => {
    const {data, setData, submit, processing, errors} = useForm<{
        name: string,
        surname: string,
        phone: string,
        email: string,
        dateOfBirth: string,
        socialMediaLink: string
    }>({
        name: '',
        surname: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        socialMediaLink: ''
    });

    const submitHandler = () => {
        submit('post', store.url())
    }


    return (
        <>
            <Head title="Register">
                <link rel="preconnect" href="https://fonts.bunny.net"/>
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet"/>
            </Head>
            <div
                className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div
                    className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex flex-col">
                        <img src={'/RollingStoneBarLogo.svg'} width={'300'} className={'mx-auto'}/>
                        <div className="flex flex-col text-white text-center text-sm mt-12 gap-2 bg-neutral-700/5 p-4 rounded-md max-w-lg">
                            <span className={'font-bold'}>
                                 Become a Rolling Stone Rooftop Member
                            </span>
                            <span className={'text-gray-500'}>
                                Join our community of music lovers, tastemakers, and creatives.
                                Membership gives you access to exclusive events and members-only benefits on the city’s most exclusive rooftop.
                            </span>
                        </div>

                        <div className="flex flex-col mt-8 gap-4">
                            <div className="flex gap-4 w-full">
                                <Field className={'w-full'}>
                                    <InputGroup className={`h-auto ${errors.name ? 'border-destructive' : ''}`}>
                                        <InputGroupInput
                                            placeholder="Enter your name"
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Name*</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.name && (
                                        <FieldDescription>{errors.name}</FieldDescription>
                                    )}
                                </Field>
                                <Field className={'w-full'}>
                                    <InputGroup className={`h-auto ${errors.surname ? 'border-destructive' : ''}`}>
                                        <InputGroupInput
                                            placeholder="Enter your surname"
                                            onChange={e => setData('surname', e.target.value)}
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Surname*</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.surname && (
                                        <FieldDescription>{errors.surname}</FieldDescription>
                                    )}
                                </Field>
                            </div>
                            <div className="flex gap-4">
                                <Field className={'w-full'}>
                                    <InputGroup className={`h-auto ${errors.phone ? 'border-destructive' : ''}`}>
                                        <InputGroupInput
                                            placeholder="Enter your name"
                                            type={'tel'}
                                            onChange={e => setData('phone', e.target.value)}
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Phone*</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.phone && (
                                        <FieldDescription>{errors.phone}</FieldDescription>
                                    )}
                                </Field>
                                <Field className={'w-full'}>
                                    <InputGroup className={`h-auto ${errors.email ? 'border-destructive' : ''}`}>
                                        <InputGroupInput
                                            placeholder="Enter your name"
                                            type="email"
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        <InputGroupAddon align="block-start">
                                            <InputGroupText>Email*</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.email && (
                                        <FieldDescription>{errors.email}</FieldDescription>
                                    )}
                                </Field>
                            </div>
                            <Field>
                                <InputGroup className={`h-auto p-2 ${errors.dateOfBirth ? 'border-destructive' : ''}`}>
                                    <DatePicker
                                        date={data.dateOfBirth ? new Date(data.dateOfBirth) : undefined}
                                        setDate={(e) => setData("dateOfBirth", e ? format(e, "yyyy-MM-dd") : "")}
                                    />                                    <InputGroupAddon align="block-start">
                                        <InputGroupText>Date of birth*</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.dateOfBirth && (
                                    <FieldDescription>{errors.dateOfBirth}</FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <InputGroup className={`h-auto ${errors.socialMediaLink ? 'border-destructive' : ''}`}>
                                    <InputGroupInput
                                        placeholder="Enter your name"
                                        onChange={e => setData('socialMediaLink', e.target.value)}
                                    />
                                    <InputGroupAddon align="block-start">
                                        <InputGroupText>Social media link*</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.socialMediaLink && (
                                    <FieldDescription>{errors.socialMediaLink}</FieldDescription>
                                )}
                            </Field>

                            <div className="flex w-full">
                                <Button onClick={() => submitHandler()}>Submit</Button>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    )
}

export default RegisterPage
