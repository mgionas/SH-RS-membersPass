import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { store } from '@/routes/members'
import { UserPlusIcon } from 'lucide-react';

export function CreateMemberComponent() {
    const [ open, setOpen ] = useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        surname: '',
        email:'',
        phone:'',
        language:'',
        specialId:''
    })

    const SubmitHandler = () => {
        post(store.url(), {
            onSuccess: () => {setOpen(false)}
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <UserPlusIcon />
                        <span>Add new member</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add pass template</DialogTitle>
                        <DialogDescription>
                            Add pass template from PassNinja
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor={'name'}>Name</Label>
                            <Input name={'name'} placeholder="Enter name" onChange={(e) => setData('name', e.target.value)} value={data.name} className={errors.name && 'border-red-500'} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor={'surname'}>Surname</Label>
                            <Input name={'surname'} placeholder="Enter surname" onChange={(e) => setData('surname', e.target.value)} value={data.surname} className={errors.surname && 'border-red-500'} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor={'email'}>Email</Label>
                            <Input name={'email'} placeholder="Enter email" onChange={(e) => setData('email', e.target.value)} value={data.email} className={errors.email && 'border-red-500'} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor={'phone'}>Phone</Label>
                            <Input name={'phone'} placeholder="Enter phone" onChange={(e) => setData('phone', e.target.value)} value={data.phone} className={errors.phone && 'border-red-500'} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="language">Language</Label>
                            <Select name={'language'} onValueChange={(e) => setData('language', e)} value={data.language} >
                                <SelectTrigger className={errors.language && 'border-red-500'}>
                                    <SelectValue placeholder={'Select a language'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="ge">Georgian</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor={'specialId'}>Special Id</Label>
                            <Input name={'specialId'} placeholder="Enter phone" onChange={(e) => setData('specialId', e.target.value)} value={data.specialId} className={errors.specialId && 'border-red-500'} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => SubmitHandler()} disabled={processing}>
                            {processing ? 'Saving' : 'Store'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
