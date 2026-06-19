import PageHeader from "@/components/super-admin/page-header";
import PlanForm from "@/components/super-admin/plan-form";

export default function NewPlanPage() {
  return (
    <>
      <PageHeader
        title="Create plan"
        description="Add a new subscription package for companies."
      />
      <PlanForm />
    </>
  );
}
