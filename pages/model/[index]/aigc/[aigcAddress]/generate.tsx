import FormAIGC from "@/components/formAIGC";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRouter } from "next/router";

export default function GenerateAIGC() {
  const router = useRouter();
  const { index, aigcAddress } = router.query;

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="container mx-auto md:max-w-2xl flex min-h-screen flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">
        Generate your AIGC music and art with 7007 Studio
      </h1>
      <FormAIGC
        aigtAddress={index as string}
        aigcAddress={aigcAddress as string}
      />
    </div>
  );
}
