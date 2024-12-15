"use client";

import CreateToDoForm from "@/components/todos/create/CreateToDoForm";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateToDoModal() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer
        defaultOpen={true}
        onRelease={() => {
          router.back();
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create To Do</DrawerTitle>
          </DrawerHeader>
          <CreateToDoForm />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[38em]">
        <DialogHeader>
          <DialogTitle>Create To Do</DialogTitle>
        </DialogHeader>
        <CreateToDoForm />
      </DialogContent>
    </Dialog>
  );
}
