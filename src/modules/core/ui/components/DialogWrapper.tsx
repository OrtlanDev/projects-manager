import { Dialog, DialogContent, DialogTrigger } from "@/modules/core/ui/components/shadcn/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface DialogWrapperProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
}

const DialogWrapper = ({ trigger, content }: DialogWrapperProps) => (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            {content}
        </DialogContent>
    </Dialog>
);

export default DialogWrapper;
