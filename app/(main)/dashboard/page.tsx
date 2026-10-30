import { checkUser } from '@/actions/check-user';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
    const user = await checkUser();
    if (!user) redirect('/sign-in');
    return (
        <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            here is your dashboard, {user.name || user.email}!
        </div>
    )
}

export default DashboardPage
