import {type BreadcrumbItem} from '@/types';
import {Head} from '@inertiajs/react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {useForm} from '@inertiajs/react';
import {DateTime} from 'luxon';
import {router} from '@inertiajs/react';
import {sendEmailInvitation, sendSMSInvitation, updatePass, update, destory} from '@/routes/members';
import {MailIcon, MoreHorizontalIcon, SmartphoneIcon} from 'lucide-react';
import "react-day-picker/style.css";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ButtonGroup,
} from "@/components/ui/button-group"

import AppLayout from '@/layouts/app-layout';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DatePicker from "@/components/ui/date-picker";
import {format} from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
    {
        title: 'Members',
        href: '/members',
    },
    {
        title: 'Member',
        href: '',
    },
];

export default function Dashboard({member}: { member: any }) {
    const {data, setData, post, errors} = useForm<any>({
        name: member.name,
        surname: member.surname,
        email: member.email,
        phone: member.phone,
        language: member.language,
        specialId: member.special_id,
        dateOfBirth: member.date_of_birth,
        socialMediaLink: member.social_media_link,
    });

    const SubmitEmailInvitation = () => {
        router.post(sendEmailInvitation.url(), member)
    }

    const SubmitSMSInvitation = () => {
        router.post(sendSMSInvitation.url(), member)

    }

    const UpdateHandler = () => {
        post(update.url(member.id));
    }

    const updatePassHandler = () => {
        router.post(updatePass.url());
    }

    const deleteMemberHandler = () => {
        router.delete(destory.url(member.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard"/>
            <div
                className={'flex w-full justify-between px-4 py-2 border-b border-neutral-100 dark:border-neutral-900'}>
                <div></div>
                <div className={'flex gap-2'}>
                    <Button onClick={() => updatePassHandler()} variant={'secondary'}>Update Pass</Button>

                    <ButtonGroup>
                        <Button onClick={() => SubmitEmailInvitation()} variant={'outline'}>
                            <MailIcon/>
                            <span>Email Invitation</span>
                        </Button>
                        <Button onClick={() => SubmitSMSInvitation()} variant={'outline'}>
                            <SmartphoneIcon/>
                            <span>SMS Invitation</span>
                        </Button>
                    </ButtonGroup>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" size="icon" aria-label="More Options"><MoreHorizontalIcon /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={()=> deleteMemberHandler()}>Remove</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ButtonGroup>
                        <Button onClick={() => UpdateHandler()} variant={'default'}>Update</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 px-4">
                <div className={'flex flex-col gap-6 py-12'}>
                    <div className={'flex flex-col gap-4'}>
                        <div className={'flex gap-4'}>
                            <div className={'w-full'}>
                                <Label>Name</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label>Surname</Label>
                                <Input
                                    onChange={(e) => setData('surname', e.target.value)}
                                    value={data.surname}
                                />
                            </div>
                        </div>
                        <div className={'flex gap-4'}>
                            <div className={'w-full'}>
                                <Label>Email</Label>
                                <Input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label>Phone</Label>
                                <Input
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'flex gap-4'}>
                            <div className={'w-full'}>
                                <Label>Date of birth</Label>
                                <DatePicker
                                    date={data.dateOfBirth ? new Date(data.dateOfBirth) : undefined}
                                    setDate={(e) => setData("dateOfBirth", e ? format(e, "yyyy-MM-dd") : "")}
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label>Social Media Link</Label>
                                <Input
                                    value={data.socialMediaLink}
                                    onChange={(e) => setData('socialMediaLink', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'flex gap-4'}>
                            <div className={'w-full'}>
                                <Label>Language</Label>
                                <Select onValueChange={e => setData('language', e)} value={data.language}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Language"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="ge">Georgian</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className={'w-full'}>
                                <Label>Special ID</Label>
                                <Input
                                    value={data.specialId}
                                    onChange={(e) => setData('specialId', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-4'}>
                        {member.passes ? (
                            <div className={'flex flex-col gap-4'}>
                                {member.passes.map((pass) => (
                                    <div key={pass.id}
                                         className={'flex flex-col p-6 border rounded-xl gap-4 bg-neutral-500/10'}>
                                        <div className={'flex w-full justify-between'}>
                                            <div className={'text-xs'}>
                                                {pass.template.platform}
                                            </div>
                                            <div className={'text-xs'}>
                                                {pass.status}
                                            </div>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-xs text-neutral-500'}>{pass.pass_type}</span>
                                            <span>{pass.serial_number}</span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <div className={'flex text-xs gap-1'}>
                                                <span>Issued at:</span>
                                                <span>{DateTime.fromSQL(pass.issue_date).toFormat('dd LLLL yy')}</span>
                                            </div>
                                            <div className={'flex text-xs gap-1'}>
                                                <span>Installed at:</span>
                                                <span>{DateTime.fromSQL(pass.installed_date).toFormat('dd LLLL yy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={''}>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
