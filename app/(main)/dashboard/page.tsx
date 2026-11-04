import { checkUser } from '@/actions/check-user';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { getWorkspaceScope } from '@/lib/workspace-scope';
import { withLastActivity, workspaceCardSelect } from '@/lib/workspace-status';
import { KanbanSquare, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
    const user = await checkUser();
    if (!user) redirect('/sign-in');

    const RECENT_COUNT = 4;
    const { orgName, where } = await getWorkspaceScope(user.id);

    const workspaces = await prisma.workspace.findMany({
        where,
        select: workspaceCardSelect
    })

    const recent = workspaces
        .map(withLastActivity)
        .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
        .slice(0, RECENT_COUNT)
    return (
        <div>
            {/* <DashboardPrompt/> */}
            <section className='mx-auto max-w-6xl'>
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground">{orgName}</p>
                        <h2 className="text-lg font-semibold">Recent workspaces</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        {workspaces.length > 0 && (
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="gap-1.5 text-muted-foreground"
                            >
                                <Link href="/workspaces">
                                    <KanbanSquare className="size-4" />
                                    View board ({workspaces.length})
                                </Link>
                            </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-1.5">
                            <Plus className="size-4" />
                            New workspace
                        </Button>

                    </div>
                </div>

            </section>
        </div>
    )
}

export default DashboardPage
