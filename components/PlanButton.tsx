"use client"
import { useAuth } from '@clerk/nextjs';
import React from 'react'
import { SubscriptionDetailsButton, useSubscription } from "@clerk/nextjs/experimental";
import { useUpgradeDialog } from './UpgradeDialog';
import { permission } from 'process';
const PlanButton = () => {
    const { orgId, has } = useAuth();
    const payerType = orgId ? "organization" : "user";
    const { data: subscription } = useSubscription({ for: payerType });
    const openUpgrade = useUpgradeDialog();

    const paidPlan = subscription?.subscriptionItems.find((item) => item.status === "active" && !item.plan.isDefault)

    const isPaid = Boolean(paidPlan)
    const canManage = isPaid && (!orgId || has?.({ permission: "org:sys_billing:manage" }));
    const planButton = (
        <button
            type="button"
            onClick={isPaid ? undefined : () => openUpgrade()}
            className='h-full border-l border-white/10 px-3 font-medium text-primary transition-colors hover:bg-primary/10'>
            {paidPlan?.plan?.name ?? "Free"}

        </button>
    )
    return (
        <div className="flex h-8 items-center overflow-hidden rounded-full border border-white/10 bg-white/3 text-xs">
            {canManage ? <SubscriptionDetailsButton for={payerType}>
                {planButton}
            </SubscriptionDetailsButton> : planButton}
        </div>
    )
}

export default PlanButton
