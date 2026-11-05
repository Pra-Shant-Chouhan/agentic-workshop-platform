"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useRouter } from 'next/navigation'
import { useUpgradeDialog } from './UpgradeDialog'
import { useFetch } from '@/hooks/use-fetch'
import { UPGRADE_REASONS } from '@/lib/plane-limits'
import { createWorkspace } from '@/actions/workspace'
import { toast } from 'sonner'

const WorkspaceDialog = ({ trigger }: { trigger: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <WorkspaceForm onDone={() => setOpen(false)} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function WorkspaceForm({ workspace, onDone }: { workspace?: null; onDone: () => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { fn: createWorkspaceFn, loading } = useFetch(createWorkspace)

    const router = useRouter()
    const openUpgrade = useUpgradeDialog();
    const handleSubmit = async () => {
        const result = await createWorkspaceFn(name, description);

        if (!result) return;
        onDone()
        if (typeof result === "object" && result !== null && "limit" in result) {
            return openUpgrade(UPGRADE_REASONS[result.limit]);
        }
        toast.success("Workspaces created successfully.")
        router.push(`/workspace/${result.workspace.id}`);
    }

    return (
        <>
            <div className='space-y-5'>
                <div className="space-y-2">
                    <Label htmlFor="workspace-name">Name</Label>
                    <Input
                        id="workspace-name"
                        placeholder="Q1 Marketing Launch"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        autoFocus
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="workspace-description">
                        Description <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                        id="workspace-description"
                        placeholder="What's this workspace for?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading || !name.trim()}>
                        {loading ? "Saving..." : workspace ? "Save" : "Create"}
                    </Button>
                </DialogFooter>
            </div>

        </>

    )
}
export default WorkspaceDialog
