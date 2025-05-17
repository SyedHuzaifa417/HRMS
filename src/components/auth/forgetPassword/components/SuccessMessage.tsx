import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export function SuccessMessage() {
  return (
    <>
      <div className="pt-7 flex flex-col justify-center">
        <h1 className="text-2xl text-gray-900 mb-4">
          All done!
        </h1>
        <div className="flex justify-center items-center pb-5">
          <Image
            src="/auth/done.png"
            alt="success"
            width={100}
            height={100}
          />
        </div>
        <Link href="/login">
          <Button className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors">
           Go back to Log in
          </Button>
        </Link>
      </div>
    </>
  );
}
