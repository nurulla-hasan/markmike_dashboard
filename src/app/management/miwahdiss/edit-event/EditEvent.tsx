import { MiwahdissForm } from "@/components/management/miwahdiss/form/miwahdiss-form";
// import { useParams } from "react-router-dom";

const EditEvent = () => {
  // const { id } = useParams();
  
  // Placeholder data
  const initialData = {
    name: "Independence Day 2026",
    description: "Celebrate Jamaica's Independence...",
    eventDate: "25-02-2026",
    cutoffDate: "25-02-2026",
    deliveryTimeline: "5-7 days",
    enableCheckout: true,
  };

  return <MiwahdissForm mode="edit" initialData={initialData} />;
};

export default EditEvent;
