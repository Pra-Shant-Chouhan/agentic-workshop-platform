"use server";

import { FREE_WORKSPACE_LIMIT, LimitError } from "@/lib/plane-limits";
import { checkUser } from "./check-user";
import { auth } from "@clerk/nextjs/server";
import { scopeWhere } from "@/lib/workspace-scope";
import { prisma } from "@/lib/prisma";
import { getEntitlements } from "@/lib/billing";
import { revalidatePath } from "next/cache";

// Workspaces are listed on both the dashboard (recent) and the board page.
function revalidateWorkspaceLists() {
    revalidatePath("/dashboard");
    revalidatePath("/workspaces");
}
export async function createWorkspace(
    name: string,
    description?: string
): Promise<{ workspace: { id: string } } | { limit: LimitError }> {
    const user = await checkUser();
    if (!user) throw new Error("Not signed in");

    const trimmedName = name.trim();
    if (!trimmedName) throw new Error("Workspace name is required");

    // Belongs to whichever org is active; no active org means a personal workspace.
    const { orgId } = await auth()
    const scope = scopeWhere(orgId, user.id);

    const { unlimitedWorkspaces } = await getEntitlements(orgId ?? user.clerkId);

    if (!unlimitedWorkspaces && (await prisma.workspace.count({ where: scope })) >= FREE_WORKSPACE_LIMIT) {
        return { limit: "workspaces" };
    }
    // New workspaces land at the top of the Planning column.
    const top = await prisma.workspace.findFirst({
        where: { status: "PLANNING", ...scope },
        orderBy: { position: "asc" },
        select: { position: true }
    })

    const workspace = await prisma.workspace.create({
        data: {
            name: trimmedName,
            description: description?.trim() || null,
            creatorId: user?.id,
            clerkOrgId: orgId ?? null,
            position: top ? top.position - 1 : 0,
            doc:{create:{}},
            canvas:{create:{}}
        }
    })
    revalidateWorkspaceLists();
    return {workspace:{id:workspace.id}}

}