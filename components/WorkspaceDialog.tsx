"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useRouter } from 'next/router'

const WorkspaceDialog = ({ trigger }: React.ReactNode) => {
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

function WorkspaceForm({ onDone }: { onDone: () => void }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter()

    return (
        <>
            {/* <div className="space-y-2">
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
            </DialogFooter> */}
        </>

    )
}
export default WorkspaceDialog
