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

    const paidPlan = subscription?.subscriptionItems.find((item)=>item.status ==="active" && !item.plan.isDefault)

    const isPaid = Boolean(paidPlan)
    const canManage = isPaid && (!orgId || has?.({ permission: "org:sys_billing:manage" }));
    return (
        <div>
            PlanButton
        </div>
    )
}

export default PlanButton
