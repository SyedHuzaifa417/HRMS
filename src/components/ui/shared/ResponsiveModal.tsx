import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className = "",
}) => {
  const isDesktop = useMediaQuery("(min-width: 640px)"); 

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`sm:max-w-[425px] ${className}`} aria-describedby={description ? "responsive-dialog-desc" : undefined}>
          <DialogHeader>
            <DialogTitle >{title}</DialogTitle>
            <DialogDescription id="responsive-dialog-desc">
              {description || ""}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="p-4 overflow-auto scrollbar-hide max-h-[600px]">
            {children}
          </ScrollArea>
          {footer && (
            <DialogFooter>
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={className} aria-describedby={description ? "responsive-dialog-desc" : undefined}>
        <DrawerHeader className="text-left">
          <DrawerTitle >{title}</DrawerTitle>
           
            <DrawerDescription id="responsive-dialog-desc">{description || ""}</DrawerDescription>
          
        </DrawerHeader>
        <ScrollArea className="p-4 overflow-auto scrollbar-hide">
          {children}
        </ScrollArea>
        {footer && (
          <DrawerFooter>
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;