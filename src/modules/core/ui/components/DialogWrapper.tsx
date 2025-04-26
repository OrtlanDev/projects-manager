import { Dialog, DialogContent, DialogTrigger } from "@/modules/core/ui/components/shadcn/dialog";

interface DialogWrapperProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
}

const DialogWrapper = ({ trigger, content }: DialogWrapperProps) => (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>{content}</DialogContent>
    </Dialog>
);

export default DialogWrapper;
